import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import Sidebar from '../components/Sidebar/Sidebar';
import Login from '../components/Registration/Login';
import Signup from '../Components/Registration/Signup';
import CenterList from '../components/AddDonor/CenterList';
import AddDonor from '../components/AddDonor/AddDonor';
import RequestList from '../components/Request/RequestList';
import Campaign from '../components/Campaign/Campaign';
import Request from '../components/Request/Request';
import Map from '../components/MapWithSearch/Map';
import BloodInventoryList from '../components/Inventory/BloodInventoryList';
import BloodInventoryForm from '../components/Inventory/BloodInventoryForm';
import CampaignContainer from '../components/Campaign/CampaignContainer';
import BloodRequestForm from '../components/Request/BloodRequestForm';
import ProtectedRoute from './ProtectedRoute'; // Import your ProtectedRoute component
import Topbar from '../components/topbar/Topbar';
import RoleCheckComponent from '../components/AuthContext/RoleCheckComponent';


const Layout = () => {
  const location = useLocation(); // Get the current location

  return (
    <>
      <div className="topbar">
      {(location.pathname !== '/login' && location.pathname !== '/signup') && (
          <div className="col-2 sidebar-container">
                    <Topbar />
          </div>
        )}
      </div>
      <div className='row d-flex main-wrapper gap-0'>
        {(location.pathname !== '/login' && location.pathname !== '/signup') && (
          <div className="col-2 sidebar-container">
            <Sidebar />
          </div>
        )}
        <div className="col"> 
          <Routes>
            {/* Protected routes */}

            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/center" element={<ProtectedRoute><CenterList /></ProtectedRoute>} />
            <Route path="/request-list" element={<ProtectedRoute><RequestList /></ProtectedRoute>} />
            <Route path="/add-center" element={<ProtectedRoute><AddDonor /></ProtectedRoute>} />
            <Route path="/request-blood" element={<ProtectedRoute><BloodRequestForm /></ProtectedRoute>} />
            <Route path="/user/request-blood" element={<ProtectedRoute><BloodRequestForm /></ProtectedRoute>} />
            <Route path="/campaign" element={<ProtectedRoute><Campaign /></ProtectedRoute>} />
            <Route path="/campaign-list" element={<ProtectedRoute><CampaignContainer /></ProtectedRoute>} />
            <Route path="/edit-campaign/:id" element={<ProtectedRoute><Campaign isEdit={true} /></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
            <Route path="/blood-inventory-list" element={<ProtectedRoute><BloodInventoryList /></ProtectedRoute>} />
            <Route path="/blood-inventory-form" element={<ProtectedRoute><BloodInventoryForm /></ProtectedRoute>} />
            <Route path="/role" element={<ProtectedRoute><RoleCheckComponent /></ProtectedRoute>} />

          </Routes>
        </div>
      </div>
      {/* Unprotected routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default Layout;
