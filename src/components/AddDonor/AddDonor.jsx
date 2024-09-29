import React from 'react'
import Input from '../Registration/Input';
import '../Registration/Input.scss';

const AddDonor = () => {
    return (
        <>
            <div className="add-container px-5 py-4">
                    <h2 class="py-3 form-heading text-center">Fill up the Form</h2>
                <form action="" className='addDonorForm'>
                    <div className='row'>
                     <div className="px-0">
                        <Input label="Center Name: " type="text" id="centername" name="centerName" placeholder="Enter the center name... " />
                        </div>
                        <div className="col-12 d-flex py-1 px-1 gap-2">
                            <div className="col-6">
                                <Input label="Firstname: " name="fname" id="fname" placeholder="Enter your firstname " type="text" />
                            </div>
                            <div className="col-6">
                                <Input label="Lastname: " name="lname" id="lname" placeholder="Enter your lastname " type="text" />
                            </div>
                        </div>
                        <div className="px-0">
                        <Input label="Email: " name="email" id="email" placeholder="Enter your email address " type="text" />

                        </div>

                        <div className="col-12 d-flex py-1 px-1 gap-2">
                             <div className="col-6">
                                <Input label="Phone no.: " name="phone" id="phone" placeholder="Enter your phone number " type="number" /></div>
                            <div className="col-6">
                                <Input label="Location: " name="location" id="location" placeholder="Enter your location " type="text" /></div>
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