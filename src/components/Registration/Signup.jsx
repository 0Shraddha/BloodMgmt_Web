import React from 'react';
import Input from './Input';
import './Input.scss';
import { Link } from 'react-router-dom'; // Import Link

const Signup = () => {
    const handleSignup = (e) => {
        e.preventDefault();
        // Handle the signup logic here (e.g., form validation, API call)
        console.log("Signup submitted");
    };

    return (
        <>
            <div className="signup-container row">
                <h2 className="py-3 form-heading text-center">Signup</h2>
                <form onSubmit={handleSignup}> {/* Add form submission handler */}
                    <div className='row px-2'>
                        <div className="col-12 d-flex gap-4 py-1">
                            <div className="col-6">
                                <Input label="Firstname: " name="fname" id="fname" placeholder="Enter your firstname " type="text" />
                            </div>
                            <div className="col-6">
                                <Input label="Lastname: " name="lname" id="lname" placeholder="Enter your lastname " type="text" />
                            </div>
                        </div>
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
                        <div className="col-12 d-flex gap-4 py-1">
                            <div className="col-6">
                                <Input label="Password: " name="password" id="password" placeholder="Enter your password " type="password" />
                            </div>
                            <div className="col-6">
                                <Input label="Re-password: " name="repassword" id="repassword" placeholder="Enter your repassword " type="password" />
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
                        <Link to="/login" type="submit" className='btn' id="btnSignup">Sign up</Link> 
                    </div>
                </form>
                <p className="text-muted text-center">Already have an account? <Link to="/login" className='btn btn-sm btn-outline-dark'>Login</Link></p>
            </div>
        </>
    );
}

export default Signup;
