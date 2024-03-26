import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobtype: '',
    workplace: '',
    name: '',
    telnumber: '',
    image: null, // Assuming you are using a file input for image upload
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('jobtype', formData.jobtype);
    formDataToSend.append('workplace', formData.workplace);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('telnumber', formData.telnumber);
    formDataToSend.append('image', formData.image);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/work`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Data posted successfully!', response.data);
      alert("succesfull")
      window.location.reload()
      // Perform any other action after successful posting
    } catch (error) {
      console.error('Error posting data:', error);
      alert("error")
    }
  };

  return (
    <>
    <Header/>
    <div className='form-body'>
    <div className='container-form'>
      <h2>Fill this form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Jobtype:
          <input type="text" name="jobtype" value={formData.jobtype} onChange={handleInputChange} required />
        </label>
        <label>
          Workplace:
          <input type="text" name="workplace" value={formData.workplace} onChange={handleInputChange} required />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label>
        <label>
          TelNumber:
          <input type="text" name="telnumber" value={formData.telnumber} onChange={handleInputChange} required />
        </label>
        
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default JobForm;
