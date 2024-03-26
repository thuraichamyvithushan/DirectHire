import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
const App = ({handlePaymentSuccess}) => {
  const [product , setProduct] = useState({
    name :'Post Your Add',
    price : 30000,
    productBy : 'DirectHire'
  })
  const makePayment = async(token) => {
    const body = {
      token,
      product
    }
    const headers ={
      'Content-Type':"application/json"
    }
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/payment`,{
      method:'POST',
      headers,
      body :JSON.stringify(body)
    }).then((response) => {
      handlePaymentSuccess()
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
  }
  return(
    <div>
     <StripeCheckout
       name="Payment"
       amount={product.price}
       currency="LKR"
       token={makePayment}
       stripeKey="pk_test_51Om8diJsNbczZewUdSZtHpeUV3SgKA5Ts0euC9HyfXX6YLRCfAo9OcC8FsbLB6OeSJtPxdhob5pynwDzWHCPthuq00RyEHaT8p"
     >
      <button>Payment</button>
     </StripeCheckout>
    </div>
  )
}
export default App
