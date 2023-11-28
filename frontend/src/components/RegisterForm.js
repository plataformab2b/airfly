import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios with `npm install axios`
import 'bootstrap/dist/css/bootstrap.min.css';


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

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterForm;