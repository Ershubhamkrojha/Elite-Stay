import React, { useState } from 'react';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import './register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [successMsg, setSuccessMsg] = useState("");
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({
    username: '',
    password: '',
    email: '',
    country: '',
    img: '', // Image URL
    city: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo({
      ...info,
      [id]: value
    });
  };



  const handleClick = async (e) => {
    try {
      e.preventDefault()
      const formData = new FormData();
      formData.append('file', file); // Append the file correctly
      formData.append("upload_preset","upload")

      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dvc3qifjr/image/upload", formData);
      console.log(uploadRes)
      const { url } = uploadRes.data;
      const newUser = { ...info, img: url };
      const response=await axios.post("/auth/register",newUser);
     
   
        if (response.status === 200) {
          window.alert("New user added sucessfully,You will now be automatically redireced to login page.")
          setSuccessMsg('New user added sucessfully,You will now be automatically redirecet to login page.');
          
  
  
          setInfo({
  
            username: "",
            password: "",
            email: "",
            country: "",
            img: "", 
            city: "",
            phone: ""
  
          });
  
          setTimeout(() => {
            setSuccessMsg('');
        
            navigate("/login");
          }, 4000);
        setFile(""); // Reset file state
       
      }
    } catch (err) {
      setError(err.message);
      setError("");
      console.log(err);
    }
  };

  return (
    <div className='new'>
      <div className="newContainer">
        <div className="top">
          <h1>User Registration</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file
              ? URL.createObjectURL(file)
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhf14RWxf6GFrK2A8CyOoXn4SEpZSBxuWOCs_T-A5peKF-fIpF&s"
            }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor='file'>Image:<DriveFolderUploadOutlinedIcon className='icon' /></label>
                <input
                  type="file"
                  id="file"
                  onChange={e=>{setFile(e.target.files[0])}}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label htmlFor='username'>Username:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your username"
                  id="username"
                  value={info.username}
                />
              </div>
              <div className="formInput">
                <label htmlFor='password'>Password:</label>
                <input
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  value={info.password}
                />
              </div>
              <div className="formInput">
                <label htmlFor='email'>Email:</label>
                <input
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  value={info.email}
                />
              </div>
              <div className="formInput">
                <label htmlFor='country'>Country:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your country"
                  id="country"
                  value={info.country}
                />
              </div>
              <div className="formInput">
                <label htmlFor='city'>City:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your city"
                  id="city"
                  value={info.city}
                />
              </div>
              <div className="formInput">
                <label htmlFor='phone'>Phone:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your phone"
                  id="phone"
                  value={info.phone}
                />
              </div>
              <button type="button" onClick={handleClick}>Send</button>
              <div className='mt-4'>
                <p className=''>Have an account? <span onClick={() => { navigate("/login") }}>Login</span></p>
                <span className="my-error">
                {error && <><div className="error-msg">{error}</div></>}
                {successMsg && <div className='success-msg'>{successMsg}</div>}
              </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
