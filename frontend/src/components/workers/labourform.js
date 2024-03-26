import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Header';
import Footer from '../../Footer';
import Payment from '../Payment/payment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LabourForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    job: '',
    experience: '',
    telnumber: '',
    image: null,
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

    if (!paymentSuccess) {
      toast.error("Please complete the payment first.");
      return;
    }

    setSubmitting(true);

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
      toast.success("Form submitted successfully!");
      // Reset form data
      setFormData({
        name: '',
        age: '',
        address: '',
        job: '',
        experience: '',
        telnumber: '',
        image: null,
      });
    } catch (error) {
      console.error('Error posting data:', error);
      toast.error("Error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentSuccess = () => {
    console.log("Payment successful!");
    setPaymentSuccess(true);
  };


  return (
    <>
      <Header />
      <div className='form-body'>
        <div className='container-form'>
          <h2>Fill this form</h2> <br/>
          <form id="form-id" onSubmit={handleSubmit}>
            {/* Input fields */}
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label><br />
            <label>
              Age:
              <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
            </label><br />
            <label>
              Address:
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            </label><br />
            <label>
              Job:
              <select type="text" name="job" value={formData.job} onChange={handleInputChange} required >
                <option value=''>Select a job</option>
                <option value='painter'>Painting</option>
                <option value='constructionworkers'>Constructionworkers</option>
                <option value='electrician'>Electrician</option>
                <option value='plumber'>Plumber</option>
                <option value='carpenter'>Carpenter</option>
                <option value='welder'>Welder</option>
              </select>
            </label><br></br>
            <label>
              Experience:
              <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} />
            </label><br />
            <label>
              Tel. Number:
              <input type="tel" name="telnumber" value={formData.telnumber} onChange={handleInputChange} />
            </label><br />
            <label>
              Image:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label><br />

            {paymentSuccess && <p>Payment Successful!</p>}
            
          </form>

       

          {!paymentSuccess && (
            <Payment handlePaymentSuccess={handlePaymentSuccess} />
          )}
          {paymentSuccess && (
            <button type="submit" form="form-id" disabled={!formData.name || !formData.age || !formData.address || !formData.job || !formData.experience || !formData.telnumber || !formData.image} >Submit Form</button>
          )}
          {submitting && <p>Submitting...</p>}
        </div>
      </div>
      <Footer />
      {/* Add ToastContainer */}
      <ToastContainer />
    </>
  );
};

export default LabourForm;
