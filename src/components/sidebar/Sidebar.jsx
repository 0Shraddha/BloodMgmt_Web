import React from 'react'
import './Sidebar.scss'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { FaListUl } from "react-icons/fa6";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";
import { MdOutlineCampaign } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { BiSolidDonateBlood } from "react-icons/bi";





const Sidebar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light">
        <div>
            <a className="navbar-brand text-center" hrerf="#"><BiSolidDonateBlood color="#B60C0C" size={100}/></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item d-flex align-items-center gap-3 mt-2">
                  <LuLayoutDashboard color="#B60C0C"/>
                <a className="nav-link lato-bold active" aria-current="page" hrerf="#">Dashboard</a>
                </li>
                <li className="nav-item d-flex align-items-center gap-3 mt-2">
                  <FaListUl />
                <a className="nav-link lato-bold" href="#">Donor List</a>
                </li>
                <li className="nav-item d-flex align-items-center gap-3 mt-2">
                  <MdOutlineInventory2 size={20}/>
                <a className="nav-link lato-bold" href="#">Inventory</a>
                </li>
                <li className="nav-item d-flex align-items-center gap-3 mt-2">
                  <FaRegFile />
                <a className="nav-link lato-bold" href="#">Request List</a>
                </li>
                <li className="nav-item d-flex align-items-center gap-3 mt-2">
                  <MdOutlineCampaign size={21}/>
                <a className="nav-link lato-bold" href="#">Campaign</a>
                </li>
                <li className="nav-item d-flex align-items-center gap-3 mt-2">
                  <MdOutlineSettings size={21}/>
                <a className="nav-link lato-bold" href="#">Setting</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Sidebar