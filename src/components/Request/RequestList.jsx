import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "../../Styles/Input.scss";
import StatusBtn from "./StatusBtn";
import ReqStatusCard from "./ReqStatusCard";
import Heading from "../Heading/Heading";
import { Link } from "react-router-dom";

const RequestList = () => {
  const [requestList, setRequestList] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/blood-request",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRequestList(data);
        setFilteredRequests(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBloodRequests();
  }, []);

  // Update status and re-filter the requests
  const updateStatus = (id, newStatus) => {
    // Update the main requestList
    const updatedList = requestList.map((request) =>
      request._id === id ? { ...request, status: newStatus } : request
    );

    setRequestList(updatedList);

    // Update the filtered view
    if (filter !== "All") {
      const newFilteredRequests = updatedList.filter(
        (request) => request.status === filter
      );
      setFilteredRequests(newFilteredRequests);
    }else{
      setFilteredRequests(updatedList);
      
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === "All") {
      setFilteredRequests(requestList);
    } else {
      setFilteredRequests(requestList.filter((request) => request.status === status));
    }
  };

  return (
    <>
      <div className="row my-5" style={{ marginTop: "10px", width: "1250px" }}>
        {/* <div className="text-end">
          <Link to="/request-blood" className="btn" id="btnSubmit">
            Add Data
          </Link>
        </div> */}
        <Heading
          title="Blood Request Lists"
          desc="Blood Request Status to be checked"
        />

        {/* Filter Buttons */}
        <div className="btn-container d-flex my-3">
          {["All", "Pending", "Approved", "Rejected"].map((status) => (
            <StatusBtn
              key={status}
              btnClass={`mx-1 btn ${
                filter === status ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => handleFilterChange(status)}
            >
              {status}
            </StatusBtn>
          ))}
        </div>

        {/* Requests List */}
        <div className="request-container" style={{ width: "80vw" }}>
          {error ? (
            <p className="text-danger">Failed to load requestList: {error}</p>
          ) : filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <ReqStatusCard
                savedStatus={request.status}
                key={request._id}
                name={request.requestedBy}
                location={request.location}
                bloodGroup={request.bloodType}
                status1="Approved"
                status2="Rejected"
                reason={request.reason}
                profileImage="path/to/profile/image.jpg"
                units={request.units}
                id={request._id}
                centerId = {request.centerId}
                document={request.document}
                currentStatus={request.status}
                onStatusChange={updateStatus} // Pass the callback

              />
            ))
          ) : (
            <p className="text-muted">No requests available for "{filter}"</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RequestList;
