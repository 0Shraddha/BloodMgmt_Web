import React from 'react'
import '../../App.css'
// import Input from '../Registration/Input'
import '../../Styles/Input.scss'
import StatusBtn from './StatusBtn'
import ReqStatusCard from './ReqStatusCard'
import Heading from '../Heading/Heading'
import { Link } from 'react-router-dom';


const RequestList = () => {
    function handleStatus(){
        console.log("approved?");
    }

  return (
   <>
    <div className="row my-5" style={{ marginTop : '10px', width: '1250px'}}>
            <div className='text-end'>
              <Link to="/request-blood" className="btn" id="btnSubmit">
                Add Data
              </Link>
            </div>
      <Heading title="Blood Request Lists" desc="Blood Request Status to be checked" />

        <div className="btn-container d-flex my-3">
            <StatusBtn btnClass="mx-1 btn btn-warning" onClick={handleStatus}>Pending</StatusBtn>
            <StatusBtn btnClass="mx-1 btn btn-outline-success" onClick={() => console.log("approved")}>Approved</StatusBtn>
            <StatusBtn btnClass="mx-1 btn btn-outline-danger" onClick={() => console.log("rejected")}>Rejected</StatusBtn>

        </div>

        <div className="request-container" style={{width:'80vw'}}>
            <ReqStatusCard
                name="Jenna Sanders"
                location="Location-10, Address"
                bloodGroup="AB+"
                status1="Approved"
                status2="Rejected"
                reason="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Lorem Ipsum is not simply random text.Lorem Ipsum is not simply random text.Lorem Ipsum is not simply random text."
                bloodFor="Self"
                profileImage="path/to/profile/image.jpg"
            />
              <ReqStatusCard
                name="Anna Anders"
                location="Location-30, Address"
                bloodGroup="AB+"
                status1="Approved"
                status2="Rejected"
                reason="Lorem Ipsum is not simply random text.Contrary to popular belief, Contrary to popular belief,Contrary to popular belief, It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Lorem Ipsum is not simply random text.Lorem Ipsum is not simply random text.Lorem Ipsum is not simply random text."
                bloodFor="Self"
                profileImage="path/to/profile/image.jpg"
            />
            <ReqStatusCard
                name="Jenna Sanders"
                location="Location-10, Address"
                bloodGroup="O+"
                status1="Approved"
                status2="Rejected"
                reason="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Lorem Ipsum is not simply random text.Lorem Ipsum is not simply random text.Lorem Ipsum is not simply random text."
                bloodFor="Self"
                profileImage="path/to/profile/image.jpg"
            />
        </div>
       
    </div>    

   </>
  )
}

export default RequestList



{/* For User UI
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

</> */}