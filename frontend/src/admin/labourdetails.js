import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../admin/Header'
import { Link } from "react-router-dom";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    age: '',
    address: '',
    job: '',
    experience: '',
    telnumber: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/ladmin`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setUpdateFormData({
      name: item.name,
      age: item.age,
      address: item.address,
      job: item.job,
      experience: item.experience,
      telnumber: item.telnumber,
    });
  };

  const handleUpdateChange = (e) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/labour/${selectedItem._id}`, updateFormData);
      console.log('Data updated successfully:', response.data);

      // Reset state after successful update
      setSelectedItem(null);
      setUpdateFormData({
        name: '',
        age: '',
        address: '',
        job: '',
        experience: '',
        telnumber: '',
      });

      // Refresh data after update
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/labour`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDeleteClick = async (itemId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/labour/${itemId}`);
      console.log('Data deleted successfully');

      // Refresh data after delete
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/labour`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const workerCount = data.length;

  return (

    <>

    <Header/>
      
    <div className='container-table'>
    <h3>Workers Details</h3>
    <br/>
    {isLoading ? (
       <h3>Loading...</h3>
     ) : (
       <table>
       <thead>
         <tr>
           <th>Name</th>
           <th>Age</th>
           <th>Address</th>
           <th>Job</th>
           <th>Experience</th>
           <th>MobileNumber</th>
           <th>Timestamp</th>
           <th>Image</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>
         {data.map((item) => (
           <tr key={item._id}>
             <td>{item.name}</td>
             <td>{item.age}</td>
             <td>{item.address}</td>
             <td>{item.job}</td>
             <td>{item.experience}</td>
             <td>{item.telnumber}</td>
             <td>{item.timestamp}</td>
             <td>
               {item.image && (
                 <img
                   src={item.image.url}
                   alt={`laborImage for ${item.name}`}
                   style={{ maxWidth: '100px', maxHeight: '100px' }}
                 />
               )}
             </td>
             <td>
               <button onClick={() => handleUpdateClick(item)} className='updatebutton'>Update</button> <br/> <br/>
               <button onClick={() => handleDeleteClick(item._id)} className='deletebutton'>Delete</button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
     )}

      {selectedItem && (
           <div className='form-body'>
        <div className='container-form'>
          <h2>Update Labour Data</h2>
        
          <form  onSubmit={handleUpdateSubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={updateFormData.name} onChange={handleUpdateChange} required />
            <label>Age:</label>
            <input type="text" name="age" value={updateFormData.age} onChange={handleUpdateChange} required />
            <label>Address:</label>
            <input type="text" name="address" value={updateFormData.address} onChange={handleUpdateChange} required />
            <label>Job:</label>
            <input type="text" name="job" value={updateFormData.job} onChange={handleUpdateChange} required />
            <label>Experience:</label>
            <input type="text" name="experience" value={updateFormData.experience} onChange={handleUpdateChange} required />
            <label>MobileNumber:</label>
            <input type="text" name="telnumber" value={updateFormData.telnumber} onChange={handleUpdateChange} required />
            <button type="submit">Update</button>
          </form>
        </div>
        </div>
      )}
    </div>
    </>
  );
};

export default App;
