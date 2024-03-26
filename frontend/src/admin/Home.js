import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../admin/Header';
import Footer from '../Footer';

function Home() {
  const [data, setData] = useState({ workers: [], jobs: [], users: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/ladmin`);
        setData(prevData => ({ ...prevData, workers: response.data }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/wadmin`);
        setData(prevData => ({ ...prevData, jobs: response.data }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
        setData(prevData => ({ ...prevData, users: response.data }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const workerCount = data.workers?.length || 0;
  const jobCount = data.jobs?.length || 0;
  const userCount = data.users?.length || 0;

  return (
    <>
      <Header />
      <div className="admincard">
        <div className="box-card  " style={{ textDecoration: 'none' }}>
          <div className="box-card-header">
            <h1>Labour Management System</h1>
          </div>
          <div className="box-card-content">
          <h3>Total Jobs</h3> <br/>
          <div className='ppp'>
            <p> {workerCount}</p>
            </div>
          </div>
        </div>
        <div className="box-card">
          <div className="box-card-header">
            <h1>Job Management System</h1>
          </div>
          <div className="box-card-content">
       
            <h3>Total Jobs</h3> <br/>
            <div className='ppp'>
            <p>    {jobCount} </p>
            </div>
          </div>
        </div>
        <div className="box-card">
          <div className="box-card-header">
            <h1>User Management System</h1>
          </div>
          <div className="box-card-content">
          <h3>Total Jobs</h3> <br/>
          <div className='ppp'>
            <p > {userCount}</p>
          </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
