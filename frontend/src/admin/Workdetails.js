import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../admin/Header';
import Modal from 'react-modal';
import { Link } from "react-router-dom";

function Workdisplay() {
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [updateFormData, setUpdateFormData] = useState({
        jobtype: '',
        description: '',
        workplace: '',
        name: '',
        telnumber: '',
        isPost: false
    });
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/wadmin`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateClick = (item) => {
        setSelectedItem(item);
        setUpdateFormData({
            jobtype: item.jobtype,
            description: item.description,
            workplace: item.workplace,
            name: item.name,
            telnumber: item.telnumber,
            isPost: item.isPost
        });
    };

    const handleUpdateChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUpdateFormData({
            ...updateFormData,
            [e.target.name]: value,
        });
    };

   const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/work/${selectedItem._id}`, updateFormData);
            console.log('Data updated successfully:', response.data);

            //Reset state after successful update
            setSelectedItem(null);
            setUpdateFormData({
                jobtype: '',
                description: '',
                workplace: '',
                name: '',
                telnumber: '',
                isPost: false
            });

            // Refresh data after update
            fetchData();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleDeleteClick = async (itemId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/work/${itemId}`);
            console.log('Data deleted successfully');

            // Refresh data after delete
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            background: '#fff',
            padding: '20px',
            borderRadius: '5px',
        },
    };

    return (
        <>
            <Header />

            <div className='container-table'>
                <h3>Job Details</h3>
                <br/>
                {isLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>JobID</th>
                                <th>Jobtype</th>
                                <th>Address</th>
<th>Name</th>
                                <th>MobileNo</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Is Post</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.jobtype}</td>
                                    <td>{item.workplace}</td>
                                    <td>{item.name}</td>
                                    <td>{item.telnumber}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        {item.image && (
                                            <img
                                                src={item.image.url}
                                                alt={`workimg for ${item.name}`}
                                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                                            />
                                        )}
                                    </td>
                                    <td>{item.isPost ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button onClick={() => handleUpdateClick(item)} className='updatebutton'>Update</button> <br/><br/>
                                        <button onClick={() => handleDeleteClick(item._id)} className='deletebutton'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal
                isOpen={selectedItem !== null}
                style={customStyles}
                onRequestClose={() => setSelectedItem(null)}
                contentLabel="Update Work Data"
            >
                 <div className='form-body'>
                   <div className='container-form'>
                <h2>Update Work Data</h2>

                <form onSubmit={handleUpdateSubmit}>
                    <label>Jobtype:</label>
                    <input type="text" name="jobtype" value={updateFormData.jobtype} onChange={handleUpdateChange} required />
                    <label>Description:</label>
                    <textarea
                        type='text'
                        name="description"
                        value={updateFormData.description}
                        onChange={handleUpdateChange}
                        required
                    />
                    <label>Place:</label>
                    <input type="text" name="workplace" value={updateFormData.workplace} onChange={handleUpdateChange} required />
                    <label>Name:</label>
                    <input type="text" name="name" value={updateFormData.name} onChange={handleUpdateChange} required />
                    <label>Mobile no:</label>
                    <input type="text" name="telnumber" value={updateFormData.telnumber}onChange={handleUpdateChange} required />
                    <label>Is Post:</label>
                    <button
                        type="button"
                        className={`post-button ${updateFormData.isPost ? 'active' : ''}`}
                        onClick={() => handleUpdateChange({ target: { name: 'isPost', value: !updateFormData.isPost } })}
                    >
                        {updateFormData.isPost ? 'Yes' : 'No'}
                    </button>

                    <br/>

                    <button type="submit">Update</button>
                </form>
                </div>
                </div>
            </Modal>
        </>
    );
}

export default Workdisplay;