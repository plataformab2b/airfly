import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchPage from './components/SearchPage';
import LoginForm from './components/LoginForm'; 
import RegisterForm from './components/RegisterForm';  
import HomePage from './components/HomePage';  
import BookingForm from './components/BookingForm';
import PaymentForm from './components/PaymentForm'; // Import the PaymentForm component
import PaymentSuccess from './components/PaymentSuccess'; // Import the PaymentSuccess component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} /> 
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/payment-form" element={<PaymentForm />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>} />        {/* more routes*/}
      </Routes>
    </Router>
  );
}
export default App;
