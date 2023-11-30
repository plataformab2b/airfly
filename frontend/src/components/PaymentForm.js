// PaymentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ selectedBooking }) => {
  const [paymentData, setPaymentData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save the payment data to the backend
      await axios.post('http://localhost:3001/api/payments', {
        ...paymentData,
        bookingId: selectedBooking.id, // Assuming you have a unique identifier for the booking
      });

      // Proceed to the next page (you can customize this part)
      // For now, let's just log a message
      console.log('Payment successful. Proceeding to the next step.');
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error, show a message, etc.
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Payment Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cardHolderName" className="form-label">
            Card Holder Name
          </label>
          <input
            type="text"
            className="form-control"
            id="cardHolderName"
            name="cardHolderName"
            value={paymentData.cardHolderName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">
            Card Number
          </label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expirationDate" className="form-label">
            Expiration Date
          </label>
          <input
            type="text"
            className="form-control"
            id="expirationDate"
            name="expirationDate"
            value={paymentData.expirationDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">
            CVV
          </label>
          <input
            type="text"
            className="form-control"
            id="cvv"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;



