import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import Header from '../Header';
import Footer from '../Footer';

const WorkerForm = () => {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    job: '',
    experience: '',
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
    formDataToSend.append('name', formData.name);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('job', formData.job);
    formDataToSend.append('experience', formData.experience);
    formDataToSend.append('telnumber', formData.telnumber);
    formDataToSend.append('image', formData.image);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/labour`, formDataToSend, {
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
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label> <br></br>
        <label>
          Age:
          <input type="text" name="age" value={formData.age} onChange={handleInputChange} required />
        </label><br></br>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        </label><br></br>
        <label>
          Job:
          <select type="text" name="job" value={formData.job} onChange={handleInputChange} required >
            <option value=''>Select a job</option>
            <option value='painter'>Painter</option> 
            <option value='constructionworkers'>Constructionworkers</option>
            <option value='electrician'>Electrician</option>
            <option value='plumber'>Plumber</option>
            <option value='carpenter'>Carpenter</option>
            <option value='welder'>Welder</option>
          </select>
        </label><br></br>
        <label>
          Experience:
          <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} required />
        </label><br></br>
        <label>
          MobileNumber:
          <input type="text" name="telnumber" value={formData.telnumber} onChange={handleInputChange} required />
        </label><br></br>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label><br></br>
        <button type="submit" >Submit</button>
      </form>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default WorkerForm;
