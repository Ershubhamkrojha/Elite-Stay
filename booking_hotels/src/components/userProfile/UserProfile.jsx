import React, { useContext } from 'react'
import './userProfile.css';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import TableList from "../../Pages/tableList/TableList.jsx";
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext)
  const handleHome=()=>{
    setTimeout(() => {

    
      navigate("/");
    }, 1000);
  }

  const handleLougout = () => {
      dispatch({ type: "LOGOUT" })
      setTimeout(() => {

    
        navigate("/login");
      }, 100);
  }
  return (
    <div className='single'>
     
      <div className="singleContainer">
    
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={user?.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{user?.username}</h1>
                <div className="detailItem">
                  <span className="itemKey"> Email:</span>
                  <span className="itemValue">{user?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Phone:</span>
                  <span className="itemValue"> {user?.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> City:</span>
                  <span className="itemValue">{user?.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> Country:</span>
                  <span className="itemValue">{user?.country}</span>
                </div>
              </div>

            </div>
          </div>
          <div className="right">
          
          <Link to='/contect'><button className="action-button">Contact Support</button></Link>

          </div>
          <div className="right">
          <button className="action-button" onClick={() => handleHome()}>Home</button>
      
           </div>
           <div className="right">
           <button className="action-button" onClick={() => handleLougout()}>Logout</button>
           </div>
        </div>

        <div className="bottom">
          <h1 className="title">Last Booking</h1>
          <TableList/>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
// <div className="profile-container">
// <div className="profile-header">
//   <h2>User Profile</h2>
//   <button className="edit-button">Edit</button>
// </div>
// <div className="profile-content">
//   <div className="profile-image">
//     <img src={user.img} alt="" className='circle-avatar'/>
//   </div>
//   <div className="profile-details">
//     <p><strong>Name:</strong>{user.username}</p>
//     <p><strong>Email:</strong>{user.email}</p>
//   </div>
// </div>
// <div className="profile-actions">
//   <button className="action-button">Check Booking Status</button>
//   <Link to='/contect'><button className="action-button">Contact Support</button></Link>

//   <button className="action-button">Logout</button>
// </div>
// </div>