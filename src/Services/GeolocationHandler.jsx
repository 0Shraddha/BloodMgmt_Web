import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GeolocationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle geolocation request
  const handleGeolocation = (path) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          console.log("User Location:", { userLat, userLng });

          // Navigate to the desired route with geolocation data
          navigate(path, {
            state: { lat: userLat, lng: userLng },
          });
        },
        (error) => {
          console.error("Geolocation error:", error.message);

          // Fallback if geolocation fails
          navigate(path);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");

      // Fallback if geolocation is unavailable
      navigate(path);
    }
  };

  useEffect(() => {
    // Trigger geolocation request if user is redirected to /dashboard or /blood-inventory-list
    if (location.pathname === '/dashboard' || location.pathname === '/blood-inventory-list') {
      handleGeolocation(location.pathname);
    }
  }, [location.pathname, navigate]);

  return null;  // This component does not render anything itself
};

export default GeolocationHandler;
