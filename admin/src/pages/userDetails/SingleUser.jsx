import React from 'react'

import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import { Link, useLocation} from 'react-router-dom'
import UserList from '../../components/table/Table'
import './singleUser.scss'
import { useState } from 'react';
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react';


const SingleUser = () => {
  const [list, setList] = useState([]);
  const location = useLocation();
  const id=location.pathname.split("/")[2];
  console.log(id)
  const userpathname = location.pathname;

  // Fetch data based on the pathname
  const { data, loading, error } = useFetch(`${userpathname}`);

  useEffect(() => {
    // Update the list when data changes
    setList(data);
  }, [data]);


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
              <img src={list.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{list.username}</h1>
                <div className="detailItem">
                  <span className="itemKey"> Email:</span>
                  <span className="itemValue">{list.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Phone:</span>
                  <span className="itemValue">{list.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> City:</span>
                  <span className="itemValue">{list.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Country:</span>
                  <span className="itemValue">{list.country}</span>
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
          <UserList userId={id}/>
        </div>
      </div>
    </div>
  )
}

export default SingleUser
