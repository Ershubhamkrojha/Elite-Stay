import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { hotelInputs } from '../../formSource'
import './newHotel.scss'
import { useState } from 'react';
import axios from 'axios';
import useFetch from '../../hooks/useFetch'



const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState([])
  const { data, loading, error } = useFetch("/rooms")
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))

  }
  const handlSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setRooms(value)

  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files)?.map(async file => {
          const data = new FormData()
          data.append("file", file)
          data.append("upload_preset", "upload")

          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dvc3qifjr/image/upload",
            data);
          const { url } = uploadRes.data;
          return url;
        }))
      console.log(info)
      const newhotel = {
        ...info, rooms,
        photos: list,
      }
     console.log(newhotel)
      const newr = await axios.post("/hotels", newhotel)
      console.log(newr);
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
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={files
              ? URL.createObjectURL(files[0])
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
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }} />
              </div>

              {hotelInputs?.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input?.label}</label>
                  <input type={input.type}
                    placeholder={input.placeholder}
                    id={input?.id} value={info[input?.id]}

                    onChange={handleChange}
                  />

                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id='fetured' onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id='rooms' multiple onChange={handlSelect} >
                  {loading ? "loading" : data && data.map(room => (
                    <option key={room._id} value={room._id}>{room.title}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewHotel
