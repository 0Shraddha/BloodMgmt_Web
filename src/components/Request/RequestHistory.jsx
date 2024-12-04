import React, { useState, useEffect } from 'react';
import Heading from '../Heading/Heading';

const RequestHistory = () => {
  const [bloodRequested, setBloodRequested] = useState([]);
  const userDetail = localStorage.getItem('userToken');
  const parsedUser = JSON.parse(userDetail);
  const username = parsedUser.username;

  useEffect(() => {
    const loadBloodRequestHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/blood-request/${username}`, {
          method: "GET",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          const data = await response.json();
          setBloodRequested(data);
          console.log("data", data);
        }
      } catch (err) {
        console.log("error!" + err);
      }
    };

    loadBloodRequestHistory();
  }, []);

  return (
    <>
    <div className='my-5'>
    <Heading title="Blood Request History" desc="Get an overview of your blood requests history" />
    </div>
      {bloodRequested && bloodRequested.length > 0 ? (
        <div style={styles.cardContainer}>
          {bloodRequested.map((request) => (
            <div key={request._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.requestedBy}>{request.requestedBy}</h2>
                <p style={{ fontSize: '16px',
    color: '#fff',
    backgroundColor: request.status === 'Approved' ? '#28a745' : request.status == "Pending"? ' #e6b800': '#dc3545', 
    padding: '6px 12px',
    borderRadius: '20px',}}>{request.status}</p>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.infoRow}>
                  <strong>Blood Type:</strong> <span>{request.bloodType}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Units Requested:</strong> <span>{request.units}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Reason:</strong> <span>{request.reason}</span>
                </div>
                <div style={styles.infoRow}>
                  <strong>Requested On:</strong> <span>{new Date(request.date).toLocaleString()}</span>
                </div>
                {request.document && (
                  <div style={styles.document}>
                    <strong>Uploaded Document: </strong>
                    <a href={`http://localhost:5000/${request.document}`} className='btn btn-sm btn-outline-dark' target="_blank" rel="noreferrer">
                      View Document
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blood request history available.</p>
      )}
    </>
  );
};

const styles = {
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#404F9C',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', // Adjusted for responsive grid
    gap: '30px',
    marginTop: '20px',
    padding: '0 20px',
  },
  card: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    borderLeft: '4px solid #404F9C',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  requestedBy: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
 
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#555',
  },
  document: {
    marginTop: '12px',
    fontSize: '14px',
    color: '#555',
  },
};

export default RequestHistory;
