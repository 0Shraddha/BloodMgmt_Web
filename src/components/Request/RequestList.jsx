import React from 'react'
import '../../App.css'
import Input from '../Registration/Input'
import '../Registration/input.scss'

const RequestList = () => {
  return (
    <>
    <div className="row"  style={{ marginTop:70}}>
        <div className="form-heading">
            <h2>Request List</h2>
        </div>
    </div>
    <div className="req-container">
    <h2 className="py-3 form-heading text-center">Request Form(user)</h2>
    <form className='py-4 px-5' action="" width="300px">
    <div className='row px-2'>
                        <div className="col-12 d-flex gap-4 py-1">
                            <div className="col-6">
                                <Input label="Username: " name="uname" id="uname" placeholder="Enter your username " type="text" />
                            </div>
                            <div className="col-6">
                                <Input label="Email: " name="email" id="email" placeholder="Enter your email address " type="email" />
                            </div>
                        </div>
                        <div className="col-12 d-flex gap-4 py-1">
                            <div className="col-6">
                                <Input label="Phone no.: " name="phone" id="phone" placeholder="Enter your phone number " type="tel" />
                            </div>
                            <div className="col-6">
                                <Input label="Location: " name="location" id="location" placeholder="Enter your location " type="text" />
                            </div>
                        </div>
                        <h6 className='mt-3'>Recipient Information</h6>
                        <div className="col-12 d-flex gap-4 py-1">
                            <div className="col-6">
                                <Input label="Recipient Name :" name="recipient_name" id="recipient_name" placeholder="Enter Recipient Name " type="text" />
                            </div>
                            <div className="col-6">
                                <Input  label="Recipient Phone no. :" name="recipient_phone" id="recipient_phone" placeholder="Enter Recipient Phone no. " type="number" />
                            </div>
                        </div>
                        <div className="ccol-12 d-flex gap-4 py-1">
                          <div className="col-12">
                          <Input textarea className=" input form-control" label="Reason" name="reason" placeholder="Provide reason for blood request" />
                          </div>
                        </div>
                       
                        <div className="col-12 d-flex gap-4 py-1">
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
                    </div>
                <div>
                    <button className='btn' id="btnRequest">Request</button>
               
                </div>
            </form>
    </div>

    </>
  )
}

export default RequestList