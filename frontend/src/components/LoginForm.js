import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios with `npm install axios`

// LoginForm component handles the login process
const LoginForm = () => {
  // State to store user credentials
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  // Handles input changes and updates state
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the login endpoint with the user credentials
      const response = await axios.post('http://localhost:3001/login', credentials);
      // Save the received token to localStorage or handle it as needed
      localStorage.setItem('token', response.data.token);
      // Redirect user or handle logged in state
    } catch (error) {
      // Handle errors, e.g., show error message to the user
      console.error(error.response.data.error);
    }
  };

   // Method to handle check-in
   const handleCheckIn = () => {
    // Add your logic to handle check-in, for example, print a message to the console
    console.log('Check-in successful!');
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        name="username"
        type="text"
        value={credentials.username}
        onChange={handleChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
      />

      <button type="submit">Login</button>
    </form>
     {/* Button and method for check-in */}
     <button onClick={handleCheckIn}>Check-in</button>
     </div>
     
  );
};

export default LoginForm;
