import React from 'react'
import { IoMailOpenOutline } from 'react-icons/io5'
import { MdNotificationsNone } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'

const Topbar = () => {
  return (
    <>
         <div className="row d-flex text-end position-absolute bg-light py-2">
          <div>
            <div className="px-4 d-inline">
              <span><IoMailOpenOutline size={20}/></span>
              <span><MdNotificationsNone size={20}/></span>
            </div>
             <span className="mx-2">
                <span className='px-1'><RxAvatar size={20}/></span>
                <span>Shraddha Dongol</span>
             </span>
            <span className='px-1 py-1 rounded-pill' style={{ color:'#22A777',backgroundColor: '#f2fff1'}}>ADMIN</span>
          </div>
          </div>
    </>
  )
}

export default Topbar