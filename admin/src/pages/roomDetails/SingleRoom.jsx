import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import { Link, useLocation } from 'react-router-dom'
import RoomTable from '../../components/roomTable/RoomTable'
import './singleRoom.scss'
import { useState } from 'react';
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react';

const SingleRoom = () => {
  const [list, setList] = useState([]);
  const location = useLocation();
  const roompathname = location.pathname;
   console.log(roompathname)
  const { data, loading, error } = useFetch(`${roompathname}`);
// console.log(data)
  useEffect(() => {
    // Update the list when data changes
    setList(data);
  }, [data]);
  console.log(list)
  
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
                <h1 className="itemTitle">{list.title}</h1>
                <div className="detailItem">
                  <span className="itemKey"> Desc:</span>
                  <span className="itemValue">{list.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Max People:</span>
                  <span className="itemValue">{list.maxPeople}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Price:</span>
                  <span className="itemValue">{list.price}</span>
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
          <RoomTable RoomPath={roompathname}/>
        </div>
      </div>
    </div>
  )
}

export default SingleRoom
