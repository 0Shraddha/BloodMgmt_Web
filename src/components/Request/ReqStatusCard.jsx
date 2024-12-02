import React, { useState } from "react";

const ReqStatusCard = ({
  name,
  location,
  bloodGroup,
  status1,
  status2,
  reason,
  units,
  profileImage,
  document,
  id,
  savedStatus,
  currentStatus,
  centerId,
  onStatusChange, // Callback to notify parent
}) => {
  const handleClick = async (status) => {
    try {
      if(status != currentStatus){
        console.log("...........", units)
        const response = await fetch(
          `http://localhost:5000/admin/blood-request/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status, units, bloodType: bloodGroup, centerId: centerId._id }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to update status");
        }
  
        const data = await response.json();
        console.log("Response:", data);
        alert(`Status updated to ${status}`);
  
        // Notify parent about the status change
        onStatusChange(id, status);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update status");
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <img
          src={
            "https://img.freepik.com/free-photo/girl-with-backpack-sunset-generative-al_169016-28612.jpg"
           || "default_image_url.jpg"}
          alt={`avatar`}
          style={styles.avatar}
        />
        <div>
          <h2 style={styles.name}>{name}</h2>
          <p style={styles.location}>{location}</p>
        </div>
        <div style={styles.statusContainer}>
          <button
            className={`btn ${
              currentStatus === status1
                ? "btn-success"
                : "btn-outline-success"
            } mx-3`}
            onClick={() => handleClick(status1)}
          >
            {status1}
          </button>
          <button
            className={`btn ${
              currentStatus === status2
                ? "btn-danger"
                : "btn-outline-danger"
            }`}
            onClick={() => handleClick(status2)}
          >
            {status2}
          </button>
        </div>
      </div>
      
      <div style={styles.content}>
      <div style={styles.row}>
          <strong>Center:</strong>
          <span style={styles.reason}>{centerId.centerName}</span>
        </div>
        <div style={styles.row}>
          <strong>In search of :</strong>
          <span style={styles.bloodGroup}>{bloodGroup}</span>
        </div>
        <div style={styles.row}>
          <strong>Reason :</strong>
          <span style={styles.reason}>{reason}</span>
        </div>
        <div style={styles.row}>
          <strong>Requested Blood units:</strong>
          <span>{units}</span>
        </div>
        {document && (
          <div style={{ marginTop: "16px" }}>
            <strong>Uploaded Document:</strong>
            <a href={`http://localhost:5000/${document}`} target="_blank" rel="noreferrer">
              View Document
            </a>
          </div>
        )}
      </div>
    </div>
  );
};


const styles = {
  card: {
    padding: "25px 16px",
    marginBottom: "16px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    borderBottom: "1px solid #ddd",
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
    color: "#404F9C",
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
    marginBottom: "5px",
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
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    position: "relative",
    width: "100%",
    maxWidth: "1400px",

    height: "800px",
    borderRadius: "8px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "20px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
};

export default ReqStatusCard;
