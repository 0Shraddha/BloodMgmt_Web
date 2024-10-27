import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../Components/dashboard/Dashboard';
import Sidebar from '../Components/Sidebar/Sidebar';
import Login from '../Components/Registration/Login';
import Signup from '../Components/Registration/Signup';
import CenterList from '../Components/AddDonor/CenterList';
import AddDonor from '../Components/AddDonor/AddDonor';
import RequestList from '../Components/Request/RequestList';
import Campaign from '../Components/Campaign/Campaign';


const Layout = () => {
  return (
    <>
        <Router>
      <div className='row'>
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
            <Route path="/req-blood" element={<RequestList />} />
            <Route path="/campaign" element={<Campaign/>} />

          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default Layout