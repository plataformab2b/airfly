import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed for making HTTP requests
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap for styling

// LoginForm component handles the user login process
const LoginForm = () => {
  // State to store user credentials input
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  // State to store messages for user feedback
  const [loginMessage, setLoginMessage] = useState('');

  // Function to handle changes in form inputs and update state accordingly
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the login endpoint with user credentials
      const response = await axios.post('http://localhost:3001/login', credentials);

      // If the authentication is successful and a token is received
      if (response.data.token) {
        // Store the JWT token in local storage
        localStorage.setItem('jwtToken', response.data.token);
        // Set the success message for user feedback
        setLoginMessage('You have been successfully logged in.');
        // Redirect user or handle logged-in state here
        // e.g., this.props.history.push('/home');
      }
    } catch (error) {
      // If the login attempt fails, handle errors
      if (error.response && error.response.data.error) {
        // Log the error message for debugging purposes
        console.error('Login error:', error.response.data.error);
      }
      // Set the error message for user feedback
      setLoginMessage('Login failed. Please try again.');
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
                  <label className="form-label">Password</label>
                  <input 
                    type="password"     
                    className="form-control"
                    name="password" 
                    value={credentials.password}    
                    onChange={handleChange} 
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {/* Display login feedback message to the user */}
                {loginMessage && <div className="alert alert-info">{loginMessage}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
