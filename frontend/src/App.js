// App.js
import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute'; // Importa PublicRoute
import SearchPage from './components/SearchPage';
import LoginForm from './components/LoginForm'; 
import RegisterForm from './components/RegisterForm';  
import HomePage from './components/HomePage';  
import BookingForm from './components/BookingForm';
import PaymentForm from './components/PaymentForm'; // Import the PaymentForm component
import PaymentSuccess from './components/PaymentSuccess'; // Import the PaymentSuccess component
import MyBookings from './components/MyBookings';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} /> 
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<PublicRoute isLoggedIn={isLoggedIn}><RegisterForm /></PublicRoute>} /> {/* Usa PublicRoute para la ruta /register */}
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/payment-form" element={<PaymentForm />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>} />   
        <Route path="/MyBookings" element={<MyBookings />} />     {/* more routes*/}
        {/* Pass handleLogout to the components that need it */}
      </Routes>
    </Router>
  );
}

export default App;