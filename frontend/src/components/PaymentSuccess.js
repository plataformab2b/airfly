import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="container mt-5 text-center">
      <img
        src="" // Replace with your tick image URL
        alt="Success"
        style={{ width: '100px', height: '100px' }}
      />
      <h2 className="mt-3">Payment Successful!</h2>
      <p>Your payment has been processed successfully.</p>
    </div>
  );
};

export default PaymentSuccess;
