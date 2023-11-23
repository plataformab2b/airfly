import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import LoginForm from './components/LoginForm'; 
import RegisterForm from './components/RegisterForm';   

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<SearchPage />} />
        <Route path="/search" element={<SearchPage />} /> 
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* more routes*/}
      </Routes>
    </Router>
  );
}
export default App;
