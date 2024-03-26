import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Header';
import Footer from '../../Footer';
import Payment from '../Payment/payment';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkForm = () => {
  const [formData, setFormData] = useState({
    jobtype: '',
    description: '',
    workplace: '',
    name: '',
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
    formDataToSend.append('jobtype', formData.jobtype);
    formDataToSend.append('description', formData.description);
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
      toast.success("Form submitted successfully!");
      // Reset form data
      setFormData({
        jobtype: '',
        description: '',
        workplace: '',
        name: '',
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
            <label>
              Jobtype:
              <select type="text" name="jobtype" value={formData.jobtype} onChange={handleInputChange} required>
                <option value=''>Select a job</option>
                <option value='painting'>Painting</option>
                <option value='constructionworks'>Construction Works</option>
                <option value='electrician'>Electrician</option>
                <option value='plumbing'>Plumbing</option>
                <option value='carpenting'>Carpenting</option>
                <option value='welding'>Welding</option>
              </select>
            </label><br/>

            <label htmlFor="message">Description:</label><br />
            <textarea
                type="text"
              name="description" 
              value={formData.description}
              onChange={handleInputChange}
              required
            /><br />

            <label>Workplace:
              <input type="text" name="workplace" value={formData.workplace} onChange={handleInputChange} />
            </label><br />

            <label>Owner Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label><br />

            <label>Tel. Number:
              <input type="tel" name="telnumber" value={formData.telnumber} onChange={handleInputChange} />
            </label><br />

            <label>Image:
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label><br />

            {paymentSuccess && <p>Payment Successful!</p>}

            {!paymentSuccess && (
              <Payment handlePaymentSuccess={handlePaymentSuccess} />
            )}
            {paymentSuccess && (
              <button type="submit" form="form-id" disabled={!formData.jobtype || !formData.description || !formData.workplace || !formData.name || !formData.telnumber || !formData.image}  >Submit Form</button>
            )}
            {submitting && <p>Submitting...</p>}
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default WorkForm;
