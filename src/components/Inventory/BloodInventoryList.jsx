import React, { useEffect, useState } from "react";
import { deleteBloodData, fetchCenterData } from "../../Services/BloodInventoryService";
import { Link, useNavigate } from "react-router-dom";
import BarChart from "../Charts/BarChart";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "../../Styles/BloodInventoryList.scss";
import Heading from "../Heading/Heading";
import { toast, ToastContainer } from 'react-toastify';


const BloodInventoryList = () => {
  const [centerBlood, setCenterBlood] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const navigate = useNavigate();

  const handleTabClick = (bloodType) => {
    setSelectedBloodType(bloodType);
  };

  const filteredInventory = centerBlood.bloodInventory?.filter((inventory) =>
    selectedBloodType ? inventory.bloodType === selectedBloodType : true
  );

  // Fetch blood details with center from backend when the component loads
  useEffect(() => {
    const loadBloodDetails = async () => {
      try {
        const fetchedBloodDetails = await fetchCenterData();
        setCenterBlood(fetchedBloodDetails);
      } catch (error) {
        console.error("Error fetching center data:", error);
      }
    };

    loadBloodDetails();
    
  }, []);

  const handleEdit = (inventory) => {
    // Navigate to the form with the selected inventory as state
    navigate("/blood-inventory-form", {
      state: { centerData: inventory },
    });
  };

  const handleDelete = async (inventory) => {
    if (window.confirm(`Are you sure you want to delete ${inventory.bloodType}?`)) {
      try {
        await deleteBloodData(inventory);
        setCenterBlood((prev) =>
          prev.bloodInventory.filter((item) => item._id !== inventory._id)
        ); // Optimistic update
        toast.success("Deleted successfully!");
      } catch (error) {
        toast.error("Error deleting data");
        console.error(error);
      }
    }
  };

  const labels = centerBlood.totalBlood?.map((blood) => blood.bloodType) || [];
  const series = [
    {
      name: "Units Available",
      data: centerBlood.totalBlood?.map((blood) => blood.units) || [],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 300,
      width: 400,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 5,
      },
    },
    xaxis: {
      categories: labels,
      title: {
        text: "Blood Types",
      },
    },
    yaxis: {
      title: {
        text: "Units",
      },
    },
  };

  const bloodTypes = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <>
      {centerBlood ? (
        <>
          <div className="row d-flex text-end">
          <ToastContainer position="top-right" autoClose={3000} />

            <span>
              <Link to="/blood-inventory-form" className="btn text-end" id="btnSubmit">
                Add Data
              </Link>
            </span>
          </div>
          <section className="chart-section mb-4">
            <Heading title="Blood Inventory Overview" />
            <BarChart series={series} options={options} />
          </section>

       
          {/* Tabs for filtering */}
          <Heading title="Filter Blood Inventory by Type" />    
          <div className="tabs-container d-flex flex-wrap my-3">
            {bloodTypes.map((type) => (
              <button
                key={type}
                className={`tab-button ${
                  selectedBloodType === type || (type === "All" && selectedBloodType === "")
                    ? "active"
                    : ""
                }`}
                onClick={() => handleTabClick(type === "All" ? "" : type)}
              >
                {type}
              </button>
            ))}
          </div>

            <div className="container mt-4">
              <div className="row">
                {filteredInventory?.map((inventory, index) => (
                  <div className="col-md-4 col-sm-6 mb-3" key={inventory._id}>
                    <div className="card mb-2">
                      <div className="card-body mb-2">
                        <h6 className="card-title">
                          <span className="rounded-pill me-2">{index + 1}.</span>
                          {inventory.centerId.centerName}
                        </h6>
                        <hr />
                        <p className="card-text">
                          <small>Blood Type:</small>{" "}
                          <span style={{ color: "#224e9f" }}>{inventory.bloodType}</span>
                        </p>
                        <p className="card-text">
                          <small>Units Available:</small> {inventory.units}
                        </p>
                        <div className="text-end">
                          <span style={{ cursor: "pointer", marginRight: "10px" }} title="Edit" onClick={() => handleEdit(inventory)}>
                            <FaRegEdit size={"16px"} color="#fcba28" />
                          </span>
                          <span style={{ cursor: "pointer" }} onClick={() => handleDelete(inventory)}>
                            <MdDeleteOutline size={"17px"} color="#e1002d" title="Delete" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </>
      ) : (
        <h2>No data</h2>
      )}
    </>
  );
};

export default BloodInventoryList;
