import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import '../../App.css';
import '../../Styles/Dashboard.scss'
import Cardcontent from '../CardContent/Cardcontent';
import TabButtonWrapper from '../TabButton/TabButtonWrapper';



const Dashboard = () => {
  
  return (
    <>
     
          {/* THE CONTENTS GOES HERE */}
            <Cardcontent  />
            <TabButtonWrapper />
    </>
  )
}

export default Dashboard