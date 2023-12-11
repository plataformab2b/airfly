import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', credentials);
      if (response.data.token) {
        localStorage.setItem('jwtToken', response.data.token);
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        console.error('Login error:', error.response.data.error);
      }
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
              {isLoggedIn ? (
                <>
                  <p>You are logged in!</p>
                  <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                </>
              ) : (
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
                  {loginMessage && <div className="alert alert-info">{loginMessage}</div>}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;