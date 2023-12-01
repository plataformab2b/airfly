import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentSuccess from './PaymentSuccess';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    cardHolderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [flightPrice, setFlightPrice] = useState(0);

  const history = useNavigate();
  const location = useLocation();
  const selectedFlight = location.state && location.state.selectedFlight;

  useEffect(() => {
    if (selectedFlight) {
      // Fetch booking details and passengers based on the selectedFlight.id
      fetchBookingDetails(selectedFlight.id);

      // Generate a random price for the flight (between $100 and $750)
      setFlightPrice(generateRandomPrice(100, 500));
    }
  }, [selectedFlight]);

  const fetchBookingDetails = async (flightId) => {
    try {
      // Replace the URL with your backend endpoint to fetch booking details
      const response = await axios.get(`http://localhost:3001/api/bookings/${flightId}`);
      setBookingDetails(response.data);
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  
  const generateRandomPrice = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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
      

      // Add validation logic here before making the API call

      // Save the payment data to the backend
      console.log('Saving payment data:', paymentData);


      // Set paymentSuccessful to true on successful payment
      setPaymentSuccessful(true);

      // Navigate to PaymentSuccess component
      history('/paymentsuccess');
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error, show a message, etc.
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Payment Information</h1>
      {/* Conditionally render PaymentSuccess when payment is successful */}
      {paymentSuccessful ? (
        <PaymentSuccess />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Display booking details */}
          <h1>Booking Details</h1>
      {selectedFlight && (
        <div>
          <h3>Selected Flight Details</h3>
          <p>Weekday: {selectedFlight.weekday}</p>
          <p>Departure: {`${selectedFlight.departure.iataCode} - ${selectedFlight.departure.scheduledTime}`}</p>
          <p>Arrival: {`${selectedFlight.arrival.iataCode} - ${selectedFlight.arrival.scheduledTime}`}</p>
          <p>Aircraft: {selectedFlight.aircraft.modelText}</p>
        </div>
      )}

          {/* Display flight price */}
          <div className="mb-4">
            <h2>Total Price</h2>
            <p>${flightPrice}</p>
          </div>

          {/* Payment form */}
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
      )}
    </div>
  );
};

export default PaymentForm;
