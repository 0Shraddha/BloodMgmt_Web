import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';
import Login from '../components/Registration/Login';
import Signup from '../Components/Registration/Signup';
import CenterList from '../Components/AddDonor/CenterList';
import AddDonor from '../components/AddDonor/AddDonor';
import RequestList from '../components/Request/RequestList';
import Campaign from '../Components/Campaign/Campaign';
import Request from '../components/Request/Request';
import BloodInventory from '../components/Inventory/BloodInventory';


const Layout = () => {
  return (
    <>
        <Router>
          <div className="row topbar">
            <Topbar />
          </div>
      <div className='row main-wrapper'>
        <div className="col-1 sidebar-container">
          <Sidebar />
        </div>
        <div className="col"> 
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/center" element={<CenterList />} />
            <Route path="/request-list" element={<RequestList />} />

            
            <Route path="/add-center" element={<AddDonor />} />
            <Route path="/blood-inventory" element={<BloodInventory />} />
            <Route path="/request-blood" element={<Request />} />
            <Route path="/campaign" element={<Campaign/>} />

          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default Layout