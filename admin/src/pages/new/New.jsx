import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import './new.scss'
import { useState } from 'react';
import axios from 'axios';
// import { Form } from 'react-router-dom'

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({

  })

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    // console.log(e.target.value)
  }
  const handleClick = async e => {
    e.preventDefault()
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "upload")
    try {

      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dvc3qifjr/image/upload",
        data);
      const { url } = uploadRes.data;
      const newUser = {
        ...info, img: url,
      };
      const response=await axios.post("/auth/register",newUser);
      console.log(response)
      if (response.status === 200) {
        window.alert("New user added sucessfully.")
      }
      setFile(""); // Reset file state
      setInfo({}); // Reset info state

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
          <h1>{title}</h1>
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
            <form className="">
              <div className="formInput">
                <label htmlFor='file'>  Image:<DriveFolderUploadOutlinedIcon className='icon' /></label>
                <input
                  type="file"
                  id="file"
                  onChange={e => setFile(e.target.files[0])}
                  style={{ display: "none" }} />
              </div>

              {inputs?.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input?.label}</label>
                  <input onChange={handleChange} type={input?.type} placeholder={input?.placeholder} id={input?.id}  value={info[input?.id]}/>
                </div>
              ))}
              <button onClick={handleClick}>Send</button>

            </form>
          </div>2
        </div>
      </div>
    </div>
  )
}

export default New
