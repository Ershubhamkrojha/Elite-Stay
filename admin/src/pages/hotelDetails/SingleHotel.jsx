import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import { Link, useLocation } from 'react-router-dom'
import HotelTable from '../../components/hotelTable/HotelTable'
import './singleHotel.scss'
import { useState } from 'react';
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react';

const SingleHotel = () => {
  const [list, setList] = useState([]);
  const location = useLocation();
  const userpathname = location.pathname;
  // console.log(userpathname)
  const { data, loading, error } = useFetch(`${userpathname}`);
// console.log(data)
  useEffect(() => {
    // Update the list when data changes
    setList(data);
  }, [data]);
  // console.log(list)

  return (
    <div className='single'>
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src="https://www.justahotels.com/wp-content/uploads/2023/12/Ssatva-15.png" alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{list.name}</h1>
                <div className="detailItem">
                  <span className="itemKey"> Title:</span>
                  <span className="itemValue">{list.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Type:</span>
                  <span className="itemValue">{list.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> City:</span>
                  <span className="itemValue">{list.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Address:</span>
                  <span className="itemValue">{list.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Country:</span>
                  <span className="itemValue">India</span>
                </div>
              </div>

            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Month's )" />
          </div>
        </div>

        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <HotelTable hotelPath={userpathname}/>
        </div>
      </div>
    </div>
  )
}

export default SingleHotel
