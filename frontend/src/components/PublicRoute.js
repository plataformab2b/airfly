// PublicRoute.js
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();

  return isLoggedIn ? <Navigate to="/" state={{ from: location }} /> : children;
};

export default PublicRoute;