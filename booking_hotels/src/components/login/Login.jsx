import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import './login.css'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate=useNavigate();
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })
    const {user, loading, error, dispatch } = useContext(AuthContext)
 
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))

    }
    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {

            const res=await axios.post("/auth/login",credentials)
            dispatch({type:"LOGIN_SUCCESS",payload:res.data.details})
            navigate('/');
            setCredentials({
                username:"",
                password:"",
            })
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE" ,payload:error.response.data})
        }
    }
    return (
        <div className='login'>
            <div className="lContainer">
                <input type="text" placeholder='username' id='username' name='username' className='lInput' onChange={handleChange} />
                <input type="password" placeholder='password' id='password' name='password' className='lInput' onChange={handleChange} />
                <button className="lButton" disabled={loading} onClick={handleClick}>Login</button>
                {error &&
                    <span>
                        {error.message}
                    </span>

                }
            </div>

        </div>
    )
}

export default Login
