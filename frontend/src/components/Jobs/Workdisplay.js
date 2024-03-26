import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from '../../Header';
import Footer from '../../Footer';

function Workdisplay() {
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [updateFormData, setUpdateFormData] = useState({
        jobtype: '',
        description: '',
        workplace: '',
        name: '',
        telnumber: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(5); // Change this value to adjust number of jobs per page
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/work`);
                setData(response.data);
                setOriginalData(response.data); // Keep a copy of original data
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filterResult = (catItem, searchItem) => {
        let result = [...originalData]; // Make a copy of originalData

        if (catItem) {
            result = result.filter((curData) => curData.jobtype === catItem);
        }

        if (searchItem) {
            result = result.filter((curData) =>
                curData.workplace.toLowerCase().includes(searchItem.toLowerCase())
            );
        }

        setData(result);
        setCurrentPage(1); // Reset current page to 1 when filtering
    };

    // Logic for pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = data.slice(indexOfFirstJob, indexOfLastJob);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Header />
            <div className='jobdisplay'>
                <div className='container-fluid mx-2 '>
                    <div className='row mt-3 mx-2'>
                        <div className='col-md-3 mt-5' >
                         

                            <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult()}>
                                All
                            </button>
                            <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult('painting')}>
                                Painting
                            </button>
                            <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult('carpenting')}>
                                Carpenting
                            </button>
                            <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult('electrician')}>
                                Electrician
                            </button>
                            <button
                                className='btn btn-dark w-100 mb-4'
                                onClick={() => filterResult('constructionworks')}
                            >
                                Construction Works
                            </button>
                            <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult('plumbing')}>
                                Plumbing
                            </button>
                            <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult('welding')}>
                                Welding
                            </button>
                        </div>
                        <div className='col-md-9'>

                            <div className='row'>
                            <Link to='/WorkForm' style={{textDecoration:'none'}}>
                            <div className="d-flex justify-content-end">
            <button className="btn" style={{ backgroundColor: '#106861', color: 'white', width: '31%', marginBottom: '10px' }}>Post A Job</button>
 
          </div>
         </Link>
                
        <div className='col-md-8 mb-4'>
                                    
                                    <input
                                        type='text'
                                        placeholder='Search by workplace'
                                        className='form-control'
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className='col-md-4 mb-4'>
                                    <button
                                        className='btn btn-dark w-100'
                                        onClick={() => filterResult(selectedItem, searchTerm)}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                            {isLoading ? (
                                <h6>Loading...</h6>
                            ) : (
                                <ul>
                                    <div className='container'>
                                        
                                        <div className='row'>
                                            {currentJobs.map((item) => (
                                                <li style={{ listStyle: 'none' }} key={item._id}>
                                                    <div className='col-md-12 mb-4'>
                                                        <div className='card'>
                                                            <div className='row'>
                                                                <div className='col-md-3 mb-4 imgdiv'>
                                                                    <img
                                                                        src={
                                                                            item.image
                                                                                ? item.image.url
                                                                                : 'placeholder.jpg'
                                                                        }
                                                                        className='card-img-top img-fluid'
                                                                        alt={`Image for ${item.name}`}
                                                                    />
                                                                </div>
                                                                <div className='col-md-9 mb-4'>
                                                                    <div className='card-body'>
                                                                        <div className='row'>
                                                                            <div className='col-md-6 mb-4'>
                                                                                <h3 className='card-title'>
                                                                                    {' '}
                                                                                    {item.jobtype}
                                                                                </h3>
                                                                                <p className='card-text'>
                                                                                    Address: {item.workplace}
                                                                                </p>
                                                                                <p className='card-text'>
                                                                                    Name: {item.name}
                                                                                </p>
                                                                                <p className='card-text'>
                                                                                    MobileNo: {item.telnumber}
                                                                                </p>
                                                                            </div>
                                                                            <div className='col-md-6 mb-4'>
                                                                                <p>About the job</p>
                                                                                <p className='card-text'>
                                                                                    {item.description}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </div>
                                    </div>
                                </ul>
                            )}
                            <div>
                                <div className='pagination-container'>
                                    <ul className='pagination'>
                                        {[...Array(Math.ceil(data.length / jobsPerPage)).keys()].map(
                                            (number) => (
                                                <li key={number} className='page-item'>
                                                    <button
                                                        onClick={() => paginate(number + 1)}
                                                        className='page-link'
                                                    >
                                                        {number + 1}
                                                    </button>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Workdisplay;
