import React from 'react';
import '../../Styles/Sidebar.scss';
import { Link } from 'react-router-dom'; 
import { LuLayoutDashboard } from "react-icons/lu";
import { FaListUl } from "react-icons/fa6";
import { MdOutlineInventory2, MdOutlineCampaign, MdOutlineSettings, MdOutlineLogout } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";

const Sidebar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div>
        <Link className="navbar-brand text-center" to="/">
          <BiSolidDonateBlood color="#B60C0C" size={100} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item d-flex align-items-center gap-3 mt-2">
              <LuLayoutDashboard color="#B60C0C" />
              <Link className="nav-link lato-bold active" aria-current="page" to="/">Dashboard</Link>
            </li>
            <li className="nav-item d-flex align-items-center gap-3 mt-2">
              <FaListUl />
              <Link className="nav-link lato-bold" to="/center">Center List</Link>
            </li>
            {/* <li className="nav-item d-flex align-items-center gap-3 mt-2">
              <MdOutlineInventory2 size={20} />
              <Link className="nav-link lato-bold" to="/inventory">Inventory</Link>
            </li> */}
            <li className="nav-item d-flex align-items-center gap-3 mt-2">
              <FaRegFile />
              <Link className="nav-link lato-bold" to="/request-list">Request List</Link>
            </li>
            <li className="nav-item d-flex align-items-center gap-3 mt-2">
              <MdOutlineCampaign size={21} />
              <Link className="nav-link lato-bold" to="/campaign">Campaign</Link>
            </li>
            <li className="nav-item d-flex align-items-center gap-3 mt-2">
              <MdOutlineSettings size={21} />
              <Link className="nav-link lato-bold" to="/settings">Settings</Link>
            </li>
            <li className="nav-item d-flex align-items-center gap-3 mt-2">
              <MdOutlineLogout size={21} />
              <Link className="nav-link lato-bold" to="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
