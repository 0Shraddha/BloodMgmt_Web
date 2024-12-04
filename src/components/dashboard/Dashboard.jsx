import React ,{ useState} from 'react'
import '../../App.css';
import '../../Styles/Dashboard.scss'
import Cardcontent from '../CardContent/Cardcontent';
import TabButtonWrapper from '../TabButton/TabButtonWrapper';
import ApexChart from '../Charts/ApexChart';
// import UserDashboard from './UserDashboard';
import Heading from '../Heading/Heading';
import BloodInventorCards from '../Inventory/BloodInventoryCards';
import CampaignCard from '../Campaign/CampaignCard';
import SortedCampaign from '../Campaign/SortedCampaign';

const Dashboard = () => {

  return (
    <>

      <div className="row mt-5 rounded-border">
      <Heading title="Weekly Sumup"
              desc="Get summary of weekly transactions here."/>
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
      {/* <Cardcontent  /> */}

      {/* <UserDashboard /> */}
      <BloodInventorCards/>
      {/* <h2>Upcoming Campaigns</h2>
      <CampaignCard/> */}
    </>
  )
}

export default Dashboard