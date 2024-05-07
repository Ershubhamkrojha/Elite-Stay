import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RiAccountCircleFill } from "react-icons/ri";

import navbar from './navbar.css'

import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
    const { user, loading, error, dispatch } = useContext(AuthContext)
    const handleLougout = () => {
        dispatch({ type: "LOGOUT" })
    }

    return (
        <div>
            <div className='navbar'>
                <div className="navContainer">
                    <Link to='/' style={{ color: 'inherit', textDecoration: "none" }}>
                        <span className="logo">
                            <img src="https://www.justahotels.com/wp-content/uploads/2023/12/juSTa-Brand-Logo-transparent-2560x1396-1.png" alt="" />
                        </span>
                    </Link>

                    {user ?

                        < div className="iteme">
                            <Link to='/profile'>
                                <h2> <RiAccountCircleFill style={{ color: "white", fontSize: "50px" }} /></h2>
                                <h2 style={{ textDecoration: "underline", color: "white", textTransform: "uppercase" }}>
                                    WELCOME {user.username.toUpperCase()}
                                </h2>
                            </Link>

                            <div className="navIteams"><button onClick={() => handleLougout()} className="navButton">LougOut</button></div>
                            {/* <img src={user.img} alt=''
                                className='avatar'
                            /> */}
                        </div >
                        : (<div className="navIteams">
                            <Link to='/register'>
                                <button className="navButton">Register</button>
                            </Link>
                            <Link to='/login'>
                                <button className="navButton">Login</button>
                            </Link>



                        </div>
                        )}




                </div>
            </div>

        </div >
    )
}

export default Navbar
