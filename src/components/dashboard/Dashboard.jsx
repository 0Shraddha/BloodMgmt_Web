import {React, useState} from 'react'
import '../../App.css';
import '../../Styles/Dashboard.scss'
import Cardcontent from '../CardContent/Cardcontent';
import TabButtonWrapper from '../TabButton/TabButtonWrapper';
import ApexChart from '../Charts/ApexChart';
import MapComponent from '../MapWithSearch/MapComponent';



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
         
      <ApexChart />
      {/* THE CONTENTS GOES HERE */}
      
     

      <Cardcontent  />
            <TabButtonWrapper />

 
            <h1>Leaflet Map with React</h1>
      <input
        type="text"
        placeholder="Enter latitude, longitude"
        onBlur={handleLocationChange}
      />
      <MapComponent location={location} />
    </>
  )
}

export default Dashboard