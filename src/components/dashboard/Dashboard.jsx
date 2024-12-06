import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation hook
import '../../App.css';
import '../../Styles/Dashboard.scss';
import Cardcontent from '../CardContent/Cardcontent';
import TabButtonWrapper from '../TabButton/TabButtonWrapper';
import ApexChart from '../Charts/ApexChart';
import Heading from '../Heading/Heading';
import BloodInventorCards from '../Inventory/BloodInventoryCards';
import CampaignCard from '../Campaign/CampaignCard';
import SortedCampaign from '../Campaign/SortedCampaign';
import { fetchCenterData } from "../../Services/BloodInventoryService";

const Dashboard = () => {
  const location = useLocation(); // Get the location object using the useLocation hook
  const [centerBlood, setCenterBlood] = useState([]);
  const [userLat, setUserLat] = useState(undefined);
  const [userLng, setUserLng] = useState(undefined);

  // Update user location when location.state changes
  useEffect(() => {
    if (location.state?.lat && location.state?.lng) {
      setUserLat(location.state.lat);
      setUserLng(location.state.lng);
      console.log('User Location in Dashboard:', {
        lat: location.state.lat,
        lng: location.state.lng,
      });
    }
  }, [location.state]);

  // Check the console to ensure the values are being set correctly
  console.log("Current Location:", userLat, userLng);

  // Fetch blood details from backend when userLat or userLng changes
  useEffect(() => {
    // Ensure both lat and lng are valid before making the fetch request
      const loadBloodDetails = async () => {
        try {
          console.log("Fetching blood details for:", userLat, userLng);
          const fetchedBloodDetails = await fetchCenterData(userLat, userLng);
          setCenterBlood(fetchedBloodDetails);
        } catch (error) {
          console.error("Error fetching center data:", error);
        }
      };

      loadBloodDetails();
  }, [userLat, userLng]); // Dependency on userLat and userLng

  return (
    <>
      <div className="row mt-5 rounded-border">
        <Heading title="Weekly Sumup" desc="Get summary of weekly transactions here." />
      </div>

      <div className="row">
        <div className="col-6">
          <ApexChart />
        </div>
        <div className="col-6">
          <SortedCampaign />
        </div>
      </div>

      {/* <TabButtonWrapper /> */}
      {/* <Cardcontent /> */}

      {/* <UserDashboard /> */}
      <BloodInventorCards centerBloods={centerBlood} />
      {/* <h2>Upcoming Campaigns</h2>
      <CampaignCard/> */}
    </>
  );
};

export default Dashboard;
