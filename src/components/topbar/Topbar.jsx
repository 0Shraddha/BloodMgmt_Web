import React from 'react'
import { RxAvatar } from 'react-icons/rx'

const Topbar = () => {

  // Parse the string into an object
  const userDetail = localStorage.getItem('userToken');
  let fullname = '';
  let role = '';

  // Parse the string into an object if it exists
  if (userDetail) {
    const parsedUserDetail = JSON.parse(userDetail);
    fullname = `${parsedUserDetail.firstname} ${parsedUserDetail.lastname}`;
    role = parsedUserDetail.role;
  } else {
    console.log('No user details found in local storage.');
  }


  return (
    <>
         <div className="row d-flex position-absolute py-2 mb-5" style={{ right : 0}}>

             <span className="mx-2">
              <span className='p-2 mx-2 rounded-pill' style={{ color:'#22A777',backgroundColor: '#f2fff1'}}>{role}</span>
                <span className="p-2 rounded-pill border"> <RxAvatar size={22}  color='#404f9c'/> {fullname}</span>
             </span>
          </div>
    </>
  )
}

export default Topbar;