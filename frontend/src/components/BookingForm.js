import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ selectedFlight, onBookingSubmit }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have an API endpoint for submitting bookings
      await axios.post('http://localhost:3001/api/bookings', {
        flight: selectedFlight,
        paymentDetails
      });

      // Clear the form after successful submission
      setPaymentDetails({
        cardNumber: '',
        expirationDate: '',
        cvv: ''
      });

      // Optionally, you can perform additional actions after submission
      onBookingSubmit('Booking submitted successfully!');
    } catch (error) {
      console.error('Error submitting booking:', error);
      // Handle error, show a message, etc.
    }
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Card Number</label>
          <input type="text" className="form-control" name="cardNumber" onChange={handlePaymentChange} value={paymentDetails.cardNumber} required />
        </div>
        <div className="mb-3">
          <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
          <input type="text" className="form-control" name="expirationDate" onChange={handlePaymentChange} value={paymentDetails.expirationDate} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input type="text" className="form-control" name="cvv" onChange={handlePaymentChange} value={paymentDetails.cvv} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
