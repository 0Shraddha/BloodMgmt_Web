import React ,{ useState} from 'react'
import '../../App.css';
import '../../Styles/Dashboard.scss'
import Cardcontent from '../CardContent/Cardcontent';
import TabButtonWrapper from '../TabButton/TabButtonWrapper';
import ApexChart from '../Charts/ApexChart';
// import UserDashboard from './UserDashboard';
import Heading from '../Heading/Heading';



const Dashboard = () => {

  return (
    <>

      <div className="row mt-5 rounded-border">
      <Heading title="Weekly Sumup"
              desc="Get summary of weekly transactions here."/>
        </div>   
      <ApexChart />
      
    
      <TabButtonWrapper />
      <Cardcontent  />

      {/* <UserDashboard /> */}

    </>
  )
}

export default Dashboard