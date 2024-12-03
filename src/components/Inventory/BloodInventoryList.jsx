import React, { useEffect, useState } from "react";
import { deleteBloodData, fetchCenterData } from "../../Services/BloodInventoryService";
import { Link, useNavigate } from "react-router-dom";
import BarChart from "../Charts/BarChart";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "../../Styles/BloodInventoryList.scss";
import Heading from "../Heading/Heading";
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from "../AuthContext/AuthContext";
import BloodInventorCards from "./BloodInventoryCards";


const BloodInventoryList = () => {
  const [centerBlood, setCenterBlood] = useState([]);

  const navigate = useNavigate();
  const { role } = useAuth();
  const userDetail = localStorage.getItem('userToken');
  
  const parsedUser = JSON.parse(userDetail);
  const parsedUserRole = parsedUser.role




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

  const handleRequest = (inventory) => {
    // Navigate to the form with the selected inventory as state
    navigate("/request-blood", {
      state: { centerData: inventory },
    });
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
        { parsedUserRole === 'admin' ? (
          <div className="row d-flex text-end"  style={{ marginTop:'60px', marginRight : '30px'}}>
          <ToastContainer position="top-right" autoClose={3000} />

            <span>
              <Link to="/blood-inventory-form" className="btn text-end" id="btnSubmit">
                Add Data
              </Link>
            </span>
          </div>
        ): null}
         
          <section className="chart-section mb-2 mt-5">
            <Heading title="Blood Inventory Overview" />
            <BarChart series={series} options={options} />
          </section>

       
          {/* Tabs for filtering */}
          
        </>
      ) : (
        <h2>No data</h2>
      )}
      <BloodInventorCards/>
      
    </>
  );
};

export default BloodInventoryList;
