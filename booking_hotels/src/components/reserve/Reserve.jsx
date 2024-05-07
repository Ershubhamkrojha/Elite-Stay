import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { IoCloseCircleSharp } from "react-icons/io5";
import './reserve.css';
import useFetch from '../hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
// import Razorpay from 'razorpay';

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomPrice, setRoomPrice] = useState(null); // State to hold the room price
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [roomId, setRoomId] = useState(null);
  const { user } = useContext(AuthContext)
  const { dates } = useContext(SearchContext);
  const [rno, setRno] = useState(null);
  const navigate = useNavigate();
console.log(data)
  const { _id, username, email, img, phone } = user;

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates && dates[0]?.startDate, dates && dates[0]?.endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavilableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };
  const handleSelect = (e, roomNumber) => {
    const roomId = e.target.value;
    console.log(roomId)
    const rnum = roomNumber.number;
    // console.log(rnum)

    if (e.target.checked) {
      setSelectedRooms(prevSelectedRooms => [...prevSelectedRooms, roomId]);
      // Find the price of the selected room
      const room = data.find(item => item.roomNumber.some(room => room._id === roomId));
      // setRoomNumber
      setRno(rnum);

      setRoomId(room._id);
      setRoomPrice(room.price);
    } else {
      setSelectedRooms(prevSelectedRooms => prevSelectedRooms.filter(item => item !== roomId));
      setRoomPrice(null);
    }
  };

  const handleClick = async () => {
    try {
      await Promise.all(selectedRooms.map(roomId => {
        return axios.put(`/rooms/availability/${roomId}`, { dates: alldates });
      }));
      const paymentData = {
        roomId: roomId,
        roomNum:rno,
        amount: roomPrice
      };
      const { data: { key } } = await axios.get("/payment/getkey")
      const { data: { order } } = await axios.post("/payment/checkout", paymentData);
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Hotel payment",
        description: "hotel Transaction",
        image: img,
        order_id: order.id,
        
        callback_url: "/payment/paymentverification",paymentData,
        prefill: {
          name: username,
          email: email,
          contact: phone,
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#121212"
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();
      console.log(razor)
    } catch (error) {
      console.log(error);
    }

    // navigate("/payment");

  };

  return (
    <div className='reserve'>
      <div className="rContainer">
        <IoCloseCircleSharp className='rClose' onClick={() => setOpen(false)} />
        <span> Select Your rooms:</span>
        {data.map(item => (
          <div className="rItem" key={item.id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
              <div className="rPrice">Price:₹ {item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumber.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type='checkbox'
                    value={roomNumber._id}
                    onChange={(e) => handleSelect(e, roomNumber)}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {roomPrice && <div>Selected Room Price:₹ {roomPrice}</div>}
        <button onClick={handleClick} className='rButton'>Reserve Now!</button>
      </div>
    </div>
  );
};

export default Reserve;
