import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchPage from './components/SearchPage';
<<<<<<< HEAD
import BookingPage from './components/BookingPage';

=======
import LoginForm from './components/LoginForm'; 
import RegisterForm from './components/RegisterForm';  
import HomePage from './components/HomePage';  
>>>>>>> 38805cb2f177cd642224d0ec46c7fad88501b1e6

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Routes> {/* Usa 'Routes' en lugar de 'Switch' */}
        <Route path="/" element={<SearchPage />} /> {/* Cambia 'component' a 'element' y envuelve a SearchPage con <> */}
        <Route path="/booking" element={<BookingPage />} />
        {/* Otras rutas pueden ir aquí */}
=======
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} /> 
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* more routes*/}
>>>>>>> 38805cb2f177cd642224d0ec46c7fad88501b1e6
      </Routes>
    </Router>
  );
}
<<<<<<< HEAD

export default App; // Ensure that App is exported as the default


=======
export default App;
>>>>>>> 38805cb2f177cd642224d0ec46c7fad88501b1e6
