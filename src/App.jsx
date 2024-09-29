import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/Registration/Login';
import Signup from './components/Registration/Signup';
import CenterList from './components/AddDonor/CenterList';
import AddDonor from './components/AddDonor/AddDonor';
import RequestList from './components/Request/RequestList';

function App() {
  return (
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
