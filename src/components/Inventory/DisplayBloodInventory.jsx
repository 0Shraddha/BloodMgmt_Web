import React from 'react';
import { useLocation } from 'react-router-dom';

const DisplayBloodInventory = () => {
  const location = useLocation();
  const { centerList, bloodInventory, totalBlood } = location.state || {};

  return (
    <div>
      <h1>Blood Inventory List</h1>

      {/* Display Center List */}
      <h2>Center Details</h2>
      {centerList ? (
        centerList.map((center) => (
          <div key={center._id}>
            <p>Center Name: {center.centerName}</p>
            {/* Add more details as needed */}
          </div>
        ))
      ) : (
        <p>No center details available.</p>
      )}

      {/* Display Blood Inventory and Total Blood only if available */}
      {bloodInventory && (
        <>
          <h2>Blood Inventory</h2>
          {/* Render bloodInventory details */}
          <p>{JSON.stringify(bloodInventory)}</p>
        </>
      )}

      {totalBlood && (
        <>
          <h2>Total Blood</h2>
          <p>{JSON.stringify(totalBlood)}</p>
        </>
      )}
    </div>
  );
};

export default DisplayBloodInventory;
