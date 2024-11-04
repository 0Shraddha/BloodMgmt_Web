import React from 'react'
import '../../App.css';
import '../../Styles/Dashboard.scss'
import Cardcontent from '../CardContent/Cardcontent';
import TabButtonWrapper from '../TabButton/TabButtonWrapper';
import ApexChart from '../Charts/ApexChart';



const Dashboard = () => {
  
  return (
    <>
         
      <ApexChart />
      {/* THE CONTENTS GOES HERE */}
      <Cardcontent  />
            <TabButtonWrapper />

    </>
  )
}

export default Dashboard