import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';

const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Listen for URL changes
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen to popstate event (back/forward buttons)
    window.addEventListener('popstate', handleLocationChange);

    // Listen to custom navigation events
    window.addEventListener('navigate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('navigate', handleLocationChange);
    };
  }, []);

  // Route matching
  if (currentPath === '/admin') {
    return <AdminPage />;
  }

  // Default to home page
  return <HomePage />;
};

export default Router;
