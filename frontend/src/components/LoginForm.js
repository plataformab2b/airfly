import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios with `npm install axios`
import 'bootstrap/dist/css/bootstrap.min.css';

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

  return (
<div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-4">Login</h1>

         <div className="card">
            <div className="card-body">
              
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="username"  
                    value={credentials.username}
                    onChange={handleChange} 
                  />
                </div>

                <div className="mb-3">
                  <label  className="form-label">Password</label>
                  <input 
                    type="password"     
                    className="form-control"
                    name="password" 
                    value={credentials.password }    
                    onChange={handleChange} 
                  />
                </div>

                <button className="btn btn-primary">Login</button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
