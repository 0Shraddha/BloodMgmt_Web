import React from 'react'
import { IoMailOutline } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

import './Topbar.scss'

const Topbar = ({title, desc}) => {
  return (
    <>
        {/* <div className="row d-flex text-end" id="topbar">
          <div>
            <span><IoMailOutline size={20}/></span>
            <span><MdNotificationsNone size={20}/></span>
            <span><RxAvatar size={30}/></span>
          
            <div>
                <span>Shraddha Dongol</span>
                <p>ADMIN</p>
            </div>
            </div>
        </div> */}

        <div className="row heading mt-5">
          <h3 style={{ color: '#404F9C' }}>{title}</h3>
          <small className="text-muted">{desc}</small>
        </div>
    </>
  )
}

export default Topbar