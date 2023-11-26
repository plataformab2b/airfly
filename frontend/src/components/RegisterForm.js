import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios with `npm install axios`

// RegisterForm component handles the user registration process
const RegisterForm = () => {
  // State to store user registration data
  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Handles input changes and updates state
  const handleChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the register endpoint with the registration data
      const response = await axios.post('http://localhost:3001/register', registrationData);
      // Handle the response, e.g., notify the user of successful registration
      // Redirect to login page or auto-login the user
    } catch (error) {
      // Handle errors, e.g., show error message to the user
      console.error(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        name="username"
        type="text"
        value={registrationData.username}
        onChange={handleChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={registrationData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={registrationData.password}
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;

