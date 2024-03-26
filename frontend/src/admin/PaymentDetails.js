import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

function PaymentDetails() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/payments`);
        console.log('Response from server:', response.data); // Log the response data
        if (Array.isArray(response.data.data)) { // Access the 'data' property
          setPayments(response.data.data); // Set 'payments' state to the array of payment objects
          setLoading(false);
        } else {
          setError('Error: Data received is not in the expected format.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
        // Handle error
      }
    };
  
    fetchPayments();
  }, []);
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header/>
       <div className='container-table'>
       <h3>Payment Details</h3>
                <br/>
    
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Description</th>
              <th>Payment Method</th>
              <th>Customer Email</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.amount}</td>
                <td>{payment.status}</td>
                <td>{payment.description}</td>
                <td>{payment.payment_method}</td>
                <td>{payment.receipt_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
      </div>
   
    </div>
  );
}

export default PaymentDetails;
