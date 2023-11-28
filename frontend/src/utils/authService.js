export const isAuthenticated = () => {
    const token = localStorage.getItem('jwtToken');
    return !!token; 
  };
  