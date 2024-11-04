import React from 'react'
import { IoMailOpenOutline } from 'react-icons/io5'
import { MdNotificationsNone } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'

const Topbar = () => {
  return (
    <>
         <div className="row d-flex text-end position-absolute">
          <div>
            <span><IoMailOpenOutline size={20}/></span>
            <span><MdNotificationsNone size={20}/></span>
            <span><RxAvatar size={20}/></span>
            </div>
          
            <div>
                <span>Shraddha Dongol</span>
                <p>ADMIN</p>
            </div>
        </div>
    </>
  )
}

export default Topbar