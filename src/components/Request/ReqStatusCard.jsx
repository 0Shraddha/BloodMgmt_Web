import React from "react";
import { BiBorderBottom } from "react-icons/bi";



const ReqStatusCard = ({ name, location, bloodGroup, status1, status2, reason, bloodFor, profileImage, document, id }) => {
  const handleClick = async (status) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/blood-request/${id}`, {
        method: "PUT", // Adjust method (GET/POST/PUT/DELETE) as needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
  
      const data = await response.json();
      console.log("Response:", data);
      alert(`Status updated to ${status}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update status");
    }
  };
  return (
    <>
            
    <div style={styles.card}>
      <div style={styles.header}>
      <img
        src={"https://img.freepik.com/free-photo/girl-with-backpack-sunset-generative-al_169016-28612.jpg?t=st=1732550746~exp=1732554346~hmac=8b52b71b44b84446a07986c16f01134d8fa74aa6a5e29fb871088fa2d257e222&w=740"}
        alt={`${name}'s avatar`}
        style={styles.avatar}
      />

        <div>
          
          <h2 style={styles.name}>{name}</h2>
          <p style={styles.location}>{location}</p>
        </div>
        <div style={styles.statusContainer}>
          <button className="btn btn-outline-success  mx-3"  onClick={() => handleClick(status1)} >{status1}</button>
          <button className="btn btn-outline-danger"  onClick={() => handleClick(status2)}>{status2}</button>
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.row}>
          <strong>In search of :</strong>
          <span style={styles.bloodGroup}>{bloodGroup}</span>
        </div>
        <div style={styles.row}>
          <strong>Reason :</strong>
          <span style={styles.reason}>{reason}</span>
        </div>
        <div style={styles.row}>
          <strong>Blood for :</strong>
          <span>{bloodFor}</span>
        </div>
      </div>
      {document && (
          <div style={{ marginTop: "16px" }}>
            <strong>Uploaded Document:</strong>
            <button className="btn btn-success" onClick={viewDocument}>View</button>
          </div>
        )}
    </div>
    </>
  );
};

const styles = {
  card: {
    // border: "1px solid #ddd",
    // borderRadius: "8px",
    padding: "25px 16px",
    marginBottom: "16px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    borderBottom: "1px solid #ddd",
    // boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "16px",
  },
  name: {
    margin: 0,
    color : "#404F9C",
    fontSize: "18px",
    fontWeight: "bold",
  },
  location: {
    margin: 0,
    color: "#888",
  },
  statusContainer: {
    marginLeft: "auto",
  },
  status: {
    padding: "4px 8px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "14px",
  },
  content: {
    paddingTop: "8px",
  },
  row: {
    display: "flex",
    gap: "8px",
    marginBottom :  "5px"
  },
  bloodGroup: {
    padding: "4px 8px",
    backgroundColor: "#B60C0C",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "14px",
  },
  reason: {
    color: "#555",
    flex: 1,
  }
};

export default ReqStatusCard;
