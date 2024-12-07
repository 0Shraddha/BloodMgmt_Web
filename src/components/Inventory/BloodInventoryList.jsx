import React, { useEffect, useState } from "react";
import { deleteBloodData, fetchCenterData } from "../../Services/BloodInventoryService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BarChart from "../Charts/BarChart";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "../../Styles/BloodInventoryList.scss";
import Heading from "../Heading/Heading";
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from "../AuthContext/AuthContext";
import BloodInventorCards from "./BloodInventoryCards";


const BloodInventoryList = () => {
  const location = useLocation();
  const { lat, lng } = location.state || {};



  const [centerBlood, setCenterBlood] = useState([]);
  const [userLat, setUserLat] = useState(undefined);
  const [userLng, setUserLng] = useState(undefined);

  const navigate = useNavigate();
  const { role } = useAuth();
  const userDetail = localStorage.getItem('userToken');
  
  const parsedUser = JSON.parse(userDetail);
  const parsedUserRole = parsedUser.role

  useEffect(() => {
    // Access lat and lng from location state
    if (location.state?.lat && location.state?.lng) {
      setUserLat(location.state.lat);
      setUserLng(location.state.lng);
      console.log('User Location in Dashboard:', {
        lat: location.state.lat,
        lng: location.state.lng,
      });
    }
  }, [location.state])

  // Fetch blood details with center from backend when the component loads
  useEffect(() => {
    const loadBloodDetails = async () => {
      try {
        const fetchedBloodDetails = await fetchCenterData(userLat, userLng);
        
        setCenterBlood(fetchedBloodDetails);
      } catch (error) {
        console.error("Error fetching center data:", error);
      }
    };

    loadBloodDetails();
    
  }, [userLat, userLng]);

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
                Add Blood
              </Link>
            </span>
          </div>
        ): null}
         
          <section className="chart-section my-5 pt-2" style={{ marginTop : '60px'}}>
            <Heading title="Blood Inventory Overview" />
            <BarChart series={series} options={options} />
          </section>

       
          {/* Tabs for filtering */}
          
        </>
      ) : (
        <h2>No data</h2>
      )}
      <BloodInventorCards centerBloods={centerBlood} />
      
    </>
  );
};

export default BloodInventoryList;
