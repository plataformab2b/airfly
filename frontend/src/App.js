import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes // Importa 'Routes' en lugar de 'Switch'
} from 'react-router-dom';
import SearchPage from './components/SearchPage';
import BookingPage from './components/BookingPage';


function App() {
  return (
    <Router>
      <Routes> {/* Usa 'Routes' en lugar de 'Switch' */}
        <Route path="/" element={<SearchPage />} /> {/* Cambia 'component' a 'element' y envuelve a SearchPage con <> */}
        <Route path="/booking" element={<BookingPage />} />
        {/* Otras rutas pueden ir aquí */}
      </Routes>
    </Router>
  );
}

export default App; // Ensure that App is exported as the default


