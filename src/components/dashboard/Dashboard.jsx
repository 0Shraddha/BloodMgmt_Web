import {React, useState} from 'react'
import '../../App.css';
import '../../Styles/Dashboard.scss'
import Cardcontent from '../CardContent/Cardcontent';
import TabButtonWrapper from '../TabButton/TabButtonWrapper';
import ApexChart from '../Charts/ApexChart';
import UserDashboard from './UserDashboard';



const Dashboard = () => {

  const [location, setLocation] = useState([51.505, -0.09]);

  const handleLocationChange = (e) => {
    const [lat, lon] = e.target.value.split(',').map(Number);
    if (lat && lon) {
      setLocation([lat, lon]);
    }
  };
  
  return (
    <>
      <Cardcontent  />

      <div className="row bg-light my-3 rounded-border"></div>   
      <ApexChart />
      {/* THE CONTENTS GOES HERE */}
      
     

            <TabButtonWrapper />

        <UserDashboard />

    </>
  )
}

export default Dashboard