import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import { Link, useLocation } from 'react-router-dom'
import List from '../../components/table/Table'
import './single.scss'

const Single = ({columns,dataType }) => {
   // Use dataType to determine the type of data being displayed
   if (dataType === "user") {
    // Render user-specific content
  } else if (dataType === "hotel") {
    // Render hotel-specific content
  } else if (dataType === "room") {
    // Render room-specific content
  }
  
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
              <img src="https://img.freepik.com/free-photo/indian-software-engineer-working-his-laptop_53876-95098.jpg?w=996&t=st=1705486590~exp=1705487190~hmac=baea5df78f7b80f2dc3683a477349b018644d6b7202740b05356fb7216e94eb1" alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">Shubham Ojha</h1>
                <div className="detailItem">
                  <span className="itemKey"> Email:</span>
                  <span className="itemValue">ershubhamkumarojha26@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Phone:</span>
                  <span className="itemValue">+91 8825253769</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Address:</span>
                  <span className="itemValue">Matiyaria Narkatiyaganj Bihar 845455</span>
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
          <List />
        </div>
      </div>
    </div>
  )
}

export default Single
