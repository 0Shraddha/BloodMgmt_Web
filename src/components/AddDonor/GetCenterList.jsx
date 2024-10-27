import React from 'react'
import  {useState, useEffect}  from  'react';

const GetCenterList = () => {

    const [centers, setCenters] = useState([]);
    const [error, setError] = useState(null);
  
    // Fetch donors from the backend when the component loads
    useEffect(() => {
      fetch('http://localhost:8080/center', {
        method: 'GET',
        credentials: "include",
        headers: {
          "Content-Type" : "application/json"
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setCenters(data))
        .catch(error => setError(error.message));
    }, []);

  return (
   <>
   
   {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : centers.length > 0 ? (
        <ul>
          {centers.map((center, index) => (
            <li key={index}>
              <h3>{center.centerName}</h3>
              <p>Location: {center.location}</p>
              <p>Contact: {center.phone}</p>
              <p>Email: {center.email}</p>

            </li>
          ))}
        </ul>
      ) : (
        <p>No centers found.</p>
      )}
      
      </>
  )
}

export default GetCenterList