import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes // Importa 'Routes' en lugar de 'Switch'
} from 'react-router-dom';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <Router>
      <Routes> {/* Usa 'Routes' en lugar de 'Switch' */}
        <Route path="/" element={<SearchPage />} /> {/* Cambia 'component' a 'element' y envuelve a SearchPage con <> */}
        {/* Otras rutas pueden ir aquí */}
      </Routes>
    </Router>
  );
}

export default App;
