// MyBookings.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings data when the component mounts
    const fetchUserBookings = async () => {
      try {
        // Replace 'your_user_id' with the actual user ID or token
        const token = localStorage.getItem('jwtToken'); // Replace with your actual token
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('http://localhost:3001/api/bookings', { headers });

        // Assuming the backend returns an array of bookings
        const userBookingsData = response.data;

        setBookings(userBookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchUserBookings();
  }, []);

  return (
    <div className="container mt-5">
      <h1>My Bookings</h1>

      {bookings.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Weekday</th>
              <th>Departure</th>
              <th>Arrival</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.weekday}</td>
                <td>{booking.departure}</td>
                <td>{booking.arrival}</td>
                {/* Display other booking details here */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
