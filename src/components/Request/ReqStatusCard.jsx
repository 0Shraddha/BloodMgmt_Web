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
      if(status !== currentStatus){
        console.log("...........", units);
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
        <div style={styles.headerInfo}>
          <h2 style={styles.name}>{name}</h2>
          <p style={styles.location}>{location}</p>
        </div>
        <div style={styles.statusContainer}>
          <button
            className={`btn ${currentStatus === status1 ? "btn-success" : "btn-outline-success"}`}
            onClick={() => handleClick(status1)}
          >
            {status1}
          </button>
          <button
            className={`btn ${currentStatus === status2 ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => handleClick(status2)}
          >
            {status2}
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.grid}>
          <div style={styles.row}>
            <strong>Center:</strong>
            <span style={styles.centerName}>{centerId.centerName}</span>
          </div>
          <div style={styles.row}>
            <strong>In search of:</strong>
            <span style={styles.bloodGroup}>{bloodGroup}</span>
          </div>
          <div style={styles.row}>
            <strong>Reason:</strong>
            <span style={styles.reason}>{reason}</span>
          </div>
          <div style={styles.row}>
            <strong>Requested Blood units:</strong>
            <span>{units}</span>
          </div>
        </div>

        {document && (
          <div className="mt-3" style={styles.row}>
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
    padding: "20px 16px",
    marginBottom: "16px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    borderBottom: "1px solid #ddd",
    width: "100%",
    // maxWidth: "700px", // Retained original width
    margin: "auto", // Center the card
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  headerInfo: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
    display: "flex",
    gap: "8px",
  },
  content: {
    paddingTop: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Use two columns
    gap: "16px",
  },
  row: {
    display: "flex",
    gap: "8px",
    marginBottom: "8px",
    alignItems: "center",
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
};

export default ReqStatusCard;
