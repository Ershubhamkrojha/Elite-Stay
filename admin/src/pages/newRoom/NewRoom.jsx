import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import './newRoom.scss'
import { useState } from 'react';
import { roomInputs } from '../../formSource'
import useFetch from '../../hooks/useFetch'
import axios from 'axios';
// import { Form } from 'react-router-dom'

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [hotelId, setHotelId] = useState(undefined);


  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }
  console.log(info)
  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumber = rooms.split(",").map(room => ({ number: room }))
    try {
    const newRoom={
      ...info,roomNumber
    }
 
      await axios.post(`/rooms/${hotelId}`, newRoom)
    } catch (err) { 
      console.log(err)
    }

  }
  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>t</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs?.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input?.id}</label>
                  <input id={input.id} type={input?.type} placeholder={input?.placeholder}
                  
                    onChange={handleChange} />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  //  id="rooms"
                  //   value={rooms}
                  placeholder='Give comma between room number'
                  onChange={e => setRooms(e.target.value)}
                ></textarea>
              </div>

              <div className="formInput">
                <label>Choose a hotel</label>
                <select id='hotelId' onChange={(e) => { setHotelId(e.target.value) }}>
                  {loading ? "loading" : (data && data.map((hotel) => (
                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                  )))}
                </select>
              </div>

              <button onClick={handleClick}>Send</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRoom;
