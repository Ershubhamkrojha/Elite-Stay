import React, { useState } from 'react';
import './contectPage.css'

const ContectPage = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        reason:''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
       
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
      console.log(formData)
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };
      
  
  return (
    <div className="contact-form-container">
    <h2>Contact Us</h2>
    <form>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="reason">Reason for Contact:</label>
        <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} />
      </div>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  </div>
  )
}

export default ContectPage
