import React from 'react';
import '../../Styles/Sidebar.scss';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { LuLayoutDashboard } from "react-icons/lu";
import { FaListUl } from "react-icons/fa6";
import { MdOutlineInventory2, MdOutlineCampaign, MdOutlineLogout } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import { RxAvatar } from 'react-icons/rx';


const Sidebar = () => {


  const navigate = useNavigate();

  function handleGeolocation(event, path) {
    event.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;


          // Navigate to the desired route with query parameters
          navigate(path, {
            state: { lat: userLat, lng: userLng },
          });
        },
        (error) => {
          console.error("Geolocation error:", error.message);

          navigate(path);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");

      // Fallback if geolocation is unavailable
      navigate(path);
    }
  }





  const userDetail = localStorage.getItem('userToken');
  
  const parsedUser = JSON.parse(userDetail);
 	const parsedUserRole = parsedUser.role

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
  };
  
  return (

    <nav id="sidebar" className='row  justify-content-between'>
      <ul>
            <li className='text-center'>
            <span className="text-center" to="/">
              <BiSolidDonateBlood color='#B60C0C' size={90} />
            </span>
            </li>

            <li>
              <NavLink className="nav-link fw-semibold" aria-current="page" to="/dashboard" onClick={(e) => handleGeolocation(e, "/dashboard")}><LuLayoutDashboard /><span className="px-3">Dashboard</span></NavLink>
            </li>
            <li>
              <NavLink className="nav-link fw-semibold" to="/center"><FaListUl/><span className="px-3">Center List</span></NavLink>
            </li>
            <li>
              <NavLink className="nav-link fw-semibold" to="/blood-inventory-list" onClick={(e) => handleGeolocation(e, "/blood-inventory-list")}><MdOutlineInventory2 /><span className="px-3"> {parsedUserRole == "admin"? "Blood Inventory" : "Request Blood"} </span></NavLink>
            </li>
           { parsedUserRole == "admin"
            ? 
              <li>
                <NavLink className="nav-link fw-semibold" to="/request-list"><FaRegFile /><span className="px-3">Request List</span></NavLink>
              </li>
            :
            null}

          { parsedUserRole !== "admin"
            ? 
              <li>
                <NavLink className="nav-link fw-semibold" to="/request-history"><FaRegFile /><span className="px-3">Request History</span></NavLink>
              </li>
            :
            null}

            <li>
              <NavLink className="nav-link fw-semibold" to="/campaign-list"><MdOutlineCampaign size={21} /><span className="px-3">Campaign</span></NavLink>
            </li>
            
            
      </ul>

      <div>
          <ul>
            <li>
              <NavLink className="nav-link fw-semibold" to="/login" onClick={handleLogout}><MdOutlineLogout size={21} /><span className="px-3">Logout</span></NavLink>
            </li>
          </ul>
      </div>
    </nav>

  );
};

export default Sidebar;
