import React from 'react';
import paymentSuccessGif from '../'; // Update the path accordingly

const PaymentSuccess = () => {
  return (
    <div className="container mt-5 text-center">
      <img
        src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif"// Replace with your tick image URL
        alt="Success"
        style={{ width: '100px', height: '100px' }}
      />
      <h2 className="mt-3">Payment Successful!</h2>
      <p>Your payment has been processed successfully.</p>
    </div>
  );
};

export default PaymentSuccess;
