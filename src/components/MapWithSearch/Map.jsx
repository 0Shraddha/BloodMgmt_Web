import React, { useEffect, useRef, useState } from 'react';
import Input from '../Registration/Input';
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

const Map = ({ onLocationChange }) => {
  const mapRef = useRef(null);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [location, setLocation] = useState({
    address: 'None',
    latitude: 'None',
    longitude: 'None',
  });

  let mapInstance = useRef(null); // To keep track of map instance

  useEffect(() => {
    // Initialize the map centered on Kathmandu Sundhara only once
    mapInstance.current = L.map(mapRef.current).setView([27.7017, 85.324], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(mapInstance.current);

    // Handle map clicks
    mapInstance.current.on('click', async (event) => {
      const { lat, lng } = event.latlng;

      // Remove the previous marker
      if (currentMarker) {
        currentMarker.remove();
      }

      // Place a new marker
      const marker = L.marker([lat, lng]).addTo(mapInstance.current);
      setCurrentMarker(marker);

      // Reverse geocode to get the address
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const address = data.display_name || 'Address not found';
        const locationData = {
          address,
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
        };
        setLocation(locationData);
        onLocationChange(locationData); // Pass the location back to the parent
      } catch (error) {
        console.error('Error retrieving address:', error);
        const locationData = {
          address: 'Error retrieving address.',
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
        };
        setLocation(locationData);
        onLocationChange(locationData); // Pass the error location back to the parent
      }
    });

    // Cleanup on unmount: remove the map
    return () => {
      mapInstance.current.remove();
    };
  }, [currentMarker, onLocationChange]); // Re-run effect only when `currentMarker` changes

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      const query = event.target.value;
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query });

      if (results.length > 0) {
        const result = results[0];
        const { x: lng, y: lat, label: address } = result;

        // If there's a current marker, remove it from the map
        if (currentMarker) {
          currentMarker.remove();
        }

        // Create a new marker and update the map
        const marker = L.marker([lat, lng]).addTo(mapInstance.current);
        setCurrentMarker(marker);
        mapInstance.current.setView([lat, lng], 13);

        // Update the location state with the search result
        const locationData = {
          address,
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
        };
        setLocation(locationData);
        onLocationChange(locationData); // Pass the location back to the parent
      } else {
        alert('Location not found. Please try another search.');
      }
    }
  };

  return (
    <div>
      <div id="search-container" className='row'>
        <div className="col-6"> 
          <Input 
            type="text"
            placeholder="Search for a location..."
            onKeyPress={handleSearch} 
          />
        </div>
        <div className="col-6 mt-4 ps-2">
          <small className='text-secondary'>*Please enter to search the location in map</small>
        </div>
      </div>

      {/* Map container */}
      <div id="map" ref={mapRef} style={{ height: '400px', width: '100%', marginTop: '20px' }}></div>
      
      {/* Location Information */}
      <Input 
        label="Location: " 
        name="location" 
        id="location" 
        placeholder="Enter your location" 
        type="text"
        value={location.address}
        readOnly
        required
      />

      {/* Hidden inputs for latitude and longitude */}
      <input type="hidden" className='form-control' value={location.latitude} />
      <input type="hidden" className='form-control' value={location.longitude} />
    </div>
  );
};

export default Map;
