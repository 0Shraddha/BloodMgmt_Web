// MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Optional: Custom icon for marker
const customIcon = new L.Icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const MapComponent = ({ location }) => {
  const defaultPosition = [51.505, -0.09]; // Default coordinates (e.g., London)
  const position = location || defaultPosition;

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '5%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>Location: {position[0]}, {position[1]}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
