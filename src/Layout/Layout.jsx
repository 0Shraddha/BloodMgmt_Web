import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import Sidebar from '../components/Sidebar/Sidebar';
// import Topbar from '../components/topbar/Topbar';
import Login from '../components/Registration/Login';
import Signup from '../Components/Registration/Signup';
import CenterList from '../Components/AddDonor/CenterList';
import AddDonor from '../components/AddDonor/AddDonor';
import RequestList from '../components/Request/RequestList';
import Campaign from '../components/Campaign/Campaign';
import Request from '../components/Request/Request';
import Map from '../components/MapWithSearch/Map';
// import DisplayBloodInventory from '../components/Inventory/DisplayBloodInventory';
import BloodInventoryList from '../components/Inventory/BloodInventoryList';
import BloodInventoryForm from '../components/Inventory/BloodInventoryForm';
import CampaignCard from '../components/Campaign/CampaignCard';


const Layout = () => {
  return (
    <>
        <Router>
          <div className="row topbar">
            {/* <Topbar /> */}
          </div>
      <div className='row main-wrapper gap-0'>
        <div className="col-2 sidebar-container">
          <Sidebar />
        </div>
        <div className="col px-5"> 
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/center" element={<CenterList />} />
            <Route path="/request-list" element={<RequestList />} />

            
            <Route path="/add-center" element={<AddDonor />} />
            <Route path="/request-blood" element={<Request />} />
            <Route path="/campaign" element={<Campaign/>} />
            <Route path="/campaign-list" element={<CampaignCard/>} />

            <Route path="/map" element={<Map/>} />
            <Route path="/blood-inventory-list" element={<BloodInventoryList/>} />
            <Route path="/blood-inventory-form" element={<BloodInventoryForm/>} />



          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default Layout