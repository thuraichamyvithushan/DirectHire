import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from '../../Header';
import Footer from '../../Footer';

const App = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/labour`);
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

  const filterResult = (catItem, addressItem) => {
    let result = originalData; // Initialize result with original data

    if (catItem !== null && catItem !== undefined && catItem !== '') {
      // Apply category filter if catItem is not null, undefined, or empty string
      result = result.filter((curData) => {
        return curData.job === catItem;
      });
    }

    if (addressItem !== null && addressItem !== undefined && addressItem !== '') {
      // Apply address filter if addressItem is not null, undefined, or empty string
      result = result.filter((curData) => {
        return curData.address.toLowerCase().includes(addressItem.toLowerCase());
      });
    }

    setData(result); // Update data with filtered result
  };

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className='jobdisplay'>
        <div className='container-fluid mx-2'>
        
          <div className='row mt-3 mx-2'>
            <div className='col-md-3 mt-5'>
              <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult()}>
                All
              </button>
              <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult('painter')}>
                Painters
              </button>
              <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult('carpenter')}>
                Carpenters
              </button>
              <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult('electrician')}>
                Electricians
              </button>
              <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult('constructionworkers')}>
                Construction Workers
              </button>
              <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult('plumber')}>
                Plumbers
              </button>
              <button className='btn btn-dark w-100 mb-4' onClick={() => filterResult('welder')}>
                Welders
              </button>
            </div>

            <div className='col-md-9'>
              <div className='row'>
                <Link to='/FormDataForm' style={{textDecoration:'none'}}>
                  <div className="d-flex justify-content-end">
                    <button className="btn" style={{ backgroundColor: '#106861', color: 'white', width: '31%', marginBottom: '10px' }}>Create Profile</button>
                  </div>
                </Link>
                <div className='col-md-8 mb-4'>
                  <input
                    type='text'
                    placeholder='Search by address'
                    className='form-control'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className='col-md-4 mb-4'>
                  <button
                    className='btn btn-dark w-100'
                    onClick={() => filterResult(null, searchTerm)}
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
                      {currentUsers.map((item) => (
                        <li key={item._id} style={{ listStyle: 'none' }}>
                          <div className='col-md-12 mb-4'>
                            <div className='card'>
                              <div className='row'>
                                <div className='col-md-3 mb-4 imgdiv'>
                                  <img
                                    src={item.image ? item.image.url : 'placeholder.jpg'}
                                    className='card-img-top img-fluid'
                                    alt={`Image for ${item.name}`}
                                  />
                                </div>
                                <div className='col-md-9 mb-4'>
                                  <div className='card-body'>
                                    <div className='row'>
                                      <div className='col-md-6 mb-4'>
                                        <p className='card-title'> {item.job}</p>
                                        <p className='card-text'>Experience: {item.experience}</p>
                                        <p className='card-text'>Address: {item.address}</p>
                                        <p className='card-text'>Age: {item.age}</p>
                                      </div>
                                      <div className='col-md-6 mb-4'>
                                        <br />
                                        <br />
                                        <p className='card-text'>Name: {item.name}</p>
                                        <p className='card-text'>MobileNumber: {item.telnumber}</p>
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
                    {[...Array(Math.ceil(data.length / usersPerPage)).keys()].map((number) => (
                      <li key={number} className='page-item'>
                        <button onClick={() => paginate(number + 1)} className='page-link'>
                          {number + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
