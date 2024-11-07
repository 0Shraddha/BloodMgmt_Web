import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import Input from '../Registration/Input';
import { FaSearch } from 'react-icons/fa';
import "../../Styles/Map.scss"

const Map = ({ onLocationChange }) => {
  const mapContainerRef = useRef(null); // Ref to store the map container
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null); // Store the map instance in a ref

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map only once
      mapRef.current = L.map(mapContainerRef.current).setView([27.7017, 85.324], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
      }).addTo(mapRef.current);

      // Ensure click event is triggered
      mapRef.current.on('click', handleMapClick);
    }

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.off('click', handleMapClick);
      }
    };
  }, []);

  const handleMapClick = (event) => {
    console.log('Map clicked!', event.latlng); // Debugging line

    const { lat, lng } = event.latlng;

    // Remove previous markers if they exist
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });
    }

    // Add new marker and update state
    const newMarker = L.marker([lat, lng]).addTo(mapRef.current);
    setLatitude(lat);
    setLongitude(lng);

    // Fetch address via reverse geocoding
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`)
      .then(response => response.json())
      .then(data => {
        const newAddress = data.display_name || 'Address not found';
        setAddress(newAddress);
        setSearchQuery(newAddress); // Update search input
        if (onLocationChange) {
          onLocationChange(newAddress, lat, lng); // Send data to parent component
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setAddress('Error retrieving address.');
      });
  };

  const handleSearch = async (event) => {
    // Ensure search is triggered on Enter key
    if (event.key === 'Enter' && searchQuery.trim()) {
      event.preventDefault();
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: searchQuery });

      if (results.length > 0) {
        const result = results[0];
        const { x: lng, y: lat, label: newAddress } = result;

        // Remove previous markers if they exist
        if (mapRef.current) {
          mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              mapRef.current.removeLayer(layer);
            }
          });
        }

        // Update marker
        const newMarker = L.marker([lat, lng]).addTo(mapRef.current);
        mapRef.current.setView([lat, lng], 13);

        // Update state
        setLatitude(lat);
        setLongitude(lng);
        setAddress(newAddress);
        if (onLocationChange) {
          onLocationChange(newAddress, lat, lng); // Send data to parent component
        }
      } else {
        alert('Location not found. Please try another search.');
      }
    }
  };

  return (
    <div>
      <div className='row bg-light px-3 py-4 d-flex' id="search-container" style={{ marginTop: '10px' }}>
        <div className="col-12 d-flex justify-content-end">
          <div className="input-wrapper" style={{ position: 'relative', width: '40%' }}>
            <input
              className='px-2 form-control'
              type="text"
              id="search-input"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // onChange for input
              onKeyDown={handleSearch} // Trigger search on Enter key press
            />
          </div>
        </div>
        <div className="col-12">
          <Input
            label="Location:"
            type="text"
            id="location"
            placeholder="Use the search bar to find your location"
            value={address}
            required
          />
        </div>
        <span className='pe-4 text-end text-secondary fs-12'>
          <small><strong>Latitude:</strong> {latitude !== null ? latitude.toFixed(6) : 'None'}, <strong>Longitude:</strong> {longitude !== null ? longitude.toFixed(6) : 'None'}</small>
        </span>

        <div
          id="map"
          ref={mapContainerRef}
          style={{ height: '400px', width: '100%', marginTop: '20px' }}
        >
        </div>
      </div>
    </div>
  );
};

export default Map;
