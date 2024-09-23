import React from 'react'
import Input from './Input'
import './Input.scss';

const Signup = () => {

   

  return (
    <>
    <div className="signup-container row">
        <form action="">
            <div className='row'>
                <div className="col-12 d-flex gap-4 py-1">
                    <Input label="Firstname: " name="fname" id="fname" placeholder="Enter your firstname " type="text"/>
                    <Input label="Lastname: " name="lname" id="lname" placeholder="Enter your lastname " type="text"/>
                </div>
                <div className="col-12 d-flex gap-4 py-1">
                    <Input label="Username: " name="uname" id="uname" placeholder="Enter your username " type="text"/>
                    <Input label="Email: " name="email" id="email" placeholder="Enter your email address " type="text"/>
                </div>
                <div className="col-12 d-flex gap-4 py-1">
                    <Input label="Phone no.: " name="phone" id="phone" placeholder="Enter your phone number " type="number"/>
                    <Input label="Location: " name="location" id="location" placeholder="Enter your location " type="text"/>
                </div>
                <div className="col-12 d-flex gap-4 py-1">
                    <Input label="Password.: " name="password" id="password" placeholder="Enter your password " type="password"/>
                    <Input label="Re-password: " name="repassword" id="repassword" placeholder="Enter your repassword " type="password"/>
                </div>
                <Input
                    select
                    label="Blood Group: (Select your blood group) "
                    name="bloodType"
                    options={[
                    { value: 'A+', label: 'A+' },
                    { value: 'A-', label: 'A-' },
                    { value: 'B+', label: 'B+' },
                    { value: 'B-', label: 'B-' },
                    { value: 'AB+', label: 'AB+' },
                    { value: 'AB-', label: 'AB-' },
                    { value: 'O+', label: 'O+' },
                    { value: 'O-', label: 'O-' },
                    ]}
                />
            </div>
            <div>
                <button className='btn' id="btnSubmit">Signup</button>
            </div>
        </form>
    </div>
       
    </>
  )
}

export default Signup