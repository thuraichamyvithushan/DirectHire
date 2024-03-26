import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
 
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/send`, formData);

      console.log('Contact request submitted successfully:', response.data);
      alert('message send succesfully')
     
    } catch (error) {
      console.error('Error submitting contact request:', error.message);
     
    }
    navigate('/');
  };

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };


  return (
   

    <form onSubmit={handleSubmit}>
      <div className='container-contact'>
      <h2>Contact form</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
     
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
    
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      
      <button type="submit">Submit</button>
      <button type="button" onClick={handleClear}>Clear</button>

      </div>
    </form>
  );
};

export default ContactForm;
