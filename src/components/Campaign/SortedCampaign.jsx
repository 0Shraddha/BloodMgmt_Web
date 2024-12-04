import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../AuthContext/AuthContext";
import Heading from "../Heading/Heading";

const SortedCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const { role } = useAuth();
  const userDetail = localStorage.getItem('userToken');
  const parsedUser = JSON.parse(userDetail);
  const parsedUserRole = parsedUser.role;

  const stripHtmlTags = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Fetch Campaigns from the backend when the component loads
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:5000/campaign", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // Sort campaigns by date, descending order, and only pick the latest one
        const sortedCampaigns = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setCampaigns([sortedCampaigns[0]]); // Only show the latest campaign
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCampaigns();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleLearnMore = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
  };

  const handleEdit = (campaign) => {
    navigate(`/edit-campaign/${campaign._id}`, { state: { campaign } });
  };

  const handleDelete = async (campaignToDelete) => {
    if (campaignToDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/campaign/${campaignToDelete._id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete campaign");
        }

        const result = await response.json();
        toast.success(result.message || "Campaign deleted successfully!");

        // Update state by filtering out the deleted campaign
        setCampaigns((prevCampaigns) =>
          prevCampaigns.filter((c) => c._id !== campaignToDelete._id)
        );
        closeModal();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="campaign-container row">
        <Heading title="Upcoming Events" desc="Join and get to know more."/>
        {error ? (
          <p className="text-danger">Failed to load campaigns: {error}</p>
        ) : campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div className="col-md-6 col-lg-4 col-sm-6 mb-3" key={campaign._id}>
              <div className="card my-3 " style={{ width: "35rem" }}>
                <div className="card-body">
                  <h5 className="card-title py-1" style={{ textTransform: "capitalize" }}>
                    {campaign.campaignName}
                  </h5>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <h6 className="card-subtitle mb-2 text-muted">
                      <MdLocationOn size={18} color="#444" />{" "}
                      <span>{campaign.location}</span>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                      <MdAccessTime size={18} color="#444" />{" "}
                      <span>{formatDate(campaign.date)}</span>
                    </h6>
                  </div>
                  <div
                    className="card-text py-2 mb-3"
                    style={{
                      height: "5.7rem",
                      width: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {stripHtmlTags(campaign.description)}
                  </div>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <button
                      className="btn btn-dark"
                      onClick={() => handleLearnMore(campaign)}
                    >
                      Learn more
                    </button>
                    {parsedUserRole === 'admin' && (
                      <div>
                        <span
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={() => handleEdit(campaign)}
                        >
                          <FaRegEdit size={"16px"} color="#fcba28" />
                        </span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(campaign)}
                        >
                          <MdDeleteOutline size={"17px"} color="#e1002d" />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No campaigns available</p>
        )}
      </div>

      {isModalOpen && selectedCampaign && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title fw-bold"
                  style={{ textTransform: "capitalize" }}
                >
                  {selectedCampaign.campaignName}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Location:</strong> {selectedCampaign.location}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(selectedCampaign.date)}
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedCampaign.description,
                  }}
                ></div>
              </div>
              {parsedUserRole === 'admin' ? (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEdit(selectedCampaign)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(selectedCampaign)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SortedCampaign;
