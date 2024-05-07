import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import ViewStreamOutlinedIcon from '@mui/icons-material/ViewStreamOutlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import './sidebar.scss'
import { Link } from 'react-router-dom'
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext } from 'react';
// import {} from "@mui/icons-material"

const Sidebar = () => {
  const{dispatch}=useContext(DarkModeContext)
  return (
    <div className='sidebar'>
      <div className="top">
        <Link to="/" style={{textDecoration:"none"}}> 
          <span className='logo'> Admin dashboard</span>
        </Link>

      </div>
      <hr />
      <div className="center">

        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className='icon' />
            <span>DashBoard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/user" style={{textDecoration:"none"}}> 
          <li>
            <Person2OutlinedIcon className='icon' />
            <span>Users</span>
          </li>
          </Link>
          <Link to="/hotels" style={{textDecoration:"none"}}> 
          <li>
            <ProductionQuantityLimitsOutlinedIcon className='icon' />
            <span>Hotels</span>
          </li>
          </Link>
          <Link to="/rooms" style={{textDecoration:"none"}}>
          <li>
            <ViewStreamOutlinedIcon className='icon' />
            <span>Rooms</span>
          </li>
          </Link>
          <li>
            <LocalShippingIcon className='icon' />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <AssessmentIcon className='icon' />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsActiveOutlinedIcon className='icon' />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className='icon' />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className='icon' />
            <span>Logs</span>
          </li>
          <li>
            <SettingsIcon className='icon' />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className='icon' />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppOutlinedIcon className='icon' />
            <span>LougOut</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={()=>dispatch({type:"LIGHT"})}></div>
        <div className="colorOption"onClick={()=>dispatch({type:"DARK"})}></div>

      </div>

    </div>
  )
}

export default Sidebar
