import React from 'react'
import Input from '../Registration/Input';
import '../Registration/Input.scss';

const AddDonor = () => {
  return (
    <>
        <div className="addDonorContainer">
            <h2>Fill up the Form</h2>
            <form action="" className='addDonorForm'>
            <div className='row'>

                    <Input label="Center Name: " type="text" id="centername" name="centerName" placeholder="Enter the center name... "/>
                    <div className="d-flex gap-4 py-1">
                        <Input label="Firstname: " name="fname" id="fname" placeholder="Enter your firstname " type="text"/>
                        <Input label="Lastname: " name="lname" id="lname" placeholder="Enter your lastname " type="text"/>
                    </div>
                    <Input label="Email: " name="email" id="email" placeholder="Enter your email address " type="text"/>
               
                    <div className="d-flex gap-4 py-1">
                        <Input label="Phone no.: " name="phone" id="phone" placeholder="Enter your phone number " type="number"/>
                        <Input label="Location: " name="location" id="location" placeholder="Enter your location " type="text"/>
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
                    <button className='btn' id="btnAdd">Add Donor</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default AddDonor