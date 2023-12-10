import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
  // State to store user registration data
  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // State to store the registration message
  const [registrationMessage, setRegistrationMessage] = useState('');

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
  
      // If the registration is successful, show a success message
      if (response && response.data) {
        setRegistrationMessage('Your registration has been completed successfully.');
  
        // Reset the form for a new registration
        setRegistrationData({
          username: '',
          email: '',
          password: ''
        });
      }
    } catch (error) {
      // If there's an error during registration, log it and set an error message
      if (error.response && error.response.data) {
        console.error('Registration error:', error.response.data.error);
        setRegistrationMessage(`Registration failed: ${error.response.data.error}`);
      } else {
        console.error('Registration error:', error);
        setRegistrationMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-4">Register</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input 
                    type="text"
                    className="form-control" 
                    id="username"
                    name="username"
                    value={registrationData.username}
                    onChange={handleChange}                 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={registrationData.email}
                    onChange={handleChange}                 
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input 
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={registrationData.password}
                    onChange={handleChange}                 
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
                {/* Display registration feedback message to the user */}
                {registrationMessage && <div className="alert alert-info">{registrationMessage}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
