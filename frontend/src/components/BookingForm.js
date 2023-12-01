import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedFlight = location.state && location.state.selectedFlight;

  const handleSubmit = async () => {
    try {
      // Save the selected flight data to the backend (you can use axios.post here)
      console.log('Saving selected flight:', selectedFlight);

      // After saving, navigate to the payment form with the selected flight data
      navigate('/payment-form', { state: { selectedFlight } });
    } catch (error) {
      console.error('Error saving selected flight:', error);
      // Handle error, show a message, etc.
    }
  };

  return (
    <div className="container mt-5">
      <h1>Booking Details</h1>
      {selectedFlight && (
        <div>
          <h3>Selected Flight Details</h3>
          <p>Weekday: {selectedFlight.weekday}</p>
          <p>Departure: {`${selectedFlight.departure.iataCode} - ${selectedFlight.departure.scheduledTime}`}</p>
          <p>Arrival: {`${selectedFlight.arrival.iataCode} - ${selectedFlight.arrival.scheduledTime}`}</p>
          <p>Aircraft: {selectedFlight.aircraft.modelText}</p>
          {/* Add more details as needed */}
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
