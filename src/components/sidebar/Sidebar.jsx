import React from 'react';
import '../../Styles/Sidebar.scss';
import { NavLink } from 'react-router-dom'; 
import { LuLayoutDashboard } from "react-icons/lu";
import { FaListUl } from "react-icons/fa6";
import { MdOutlineInventory2, MdOutlineCampaign, MdOutlineLogout } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";

const Sidebar = () => {
  return (

    <nav id="sidebar">
      <ul>

            <li className='text-center'>
            <span className="text-center" to="/">
              <BiSolidDonateBlood color='#B60C0C' size={90} />
            </span>
            </li>

            <li>
              <NavLink className="nav-link fw-semibold" aria-current="page" to="/"><LuLayoutDashboard /><span className="px-3">Dashboard</span></NavLink>
            </li>
            <li>
              <NavLink className="nav-link fw-semibold" to="/center"><FaListUl/><span className="px-3">Center List</span></NavLink>
            </li>
            <li>
              <NavLink className="nav-link fw-semibold" to="/blood-inventory-list"><MdOutlineInventory2 /><span className="px-3">Blood Inventory</span></NavLink>
            </li>
            <li>
              <NavLink className="nav-link fw-semibold" to="/request-list"><FaRegFile /><span className="px-3">Request List</span></NavLink>
            </li>
            <li>
              <NavLink className="nav-link fw-semibold" to="/campaign-list"><MdOutlineCampaign size={21} /><span className="px-3">Campaign</span></NavLink>
            </li>
            <li>
              <NavLink className="nav-link fw-semibold" to="/login"><MdOutlineLogout size={21} /><span className="px-3">Logout</span></NavLink>
            </li>
            
      </ul>
    </nav>

  );
};

export default Sidebar;
