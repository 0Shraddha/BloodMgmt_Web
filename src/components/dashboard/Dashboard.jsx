import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import '../../App.css';
import './Dashboard.scss'
import Cardcontent from '../CardContent/Cardcontent';
import TabButtonWrapper from '../TabButton/TabButtonWrapper';
import Signup from '../Registration/Signup';
import Login from '../Registration/Login';
import AddDonor from '../AddDonor/AddDonor';


const Dashboard = () => {
  
  return (
    <>
      <div className='row'>
        <div className="col-1 sidebar-container">
          <Sidebar />
        </div>
        <div className="col"> 
          {/* THE CONTENTS GOES HERE */}
            <Cardcontent  />
            <TabButtonWrapper />
         
      </div>
    </div >

    <Signup  />
    <Login />

    <AddDonor />
    </>
  )
}

export default Dashboard