import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import '../../App.css';
import './Dashboard.scss'
import Topbar from '../topbar/Topbar';
import Cardcontent from '../CardContent/Cardcontent';
import TabButtonWrapper from '../TabButton/TabButtonWrapper';


const Dashboard = () => {
  
  return (
    <>
      <div className='row'>
        <div className="col-1 sidebar-container">
          <Sidebar />
        </div>
        <div className="col"> 
          <Topbar title="Weekly Sumup"
              desc="Get summary of weekly transactions here."/>

        {/* THE CONTENTS GOES HERE */}
          <Cardcontent  />
          <TabButtonWrapper />
         
      </div>
    </div >
    </>
  )
}

export default Dashboard