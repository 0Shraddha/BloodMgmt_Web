import React, { useState } from 'react';
import Input from "./Input";
import "../../Styles/Input.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = {
      firstname: e.target.firstname.value.trim(),
      lastname: e.target.lastname.value.trim(),
      username: e.target.username.value.trim(),
      email: e.target.email.value.trim(),
      phone: e.target.phone.value.trim(),
      password: e.target.password.value,
      repassword: e.target.repassword.value,
      bloodType: e.target.bloodType.value,
      adminAuthCode: e.target.adminAuthCode ? e.target.adminAuthCode.value : "",
      role: e.target.role.value
    };

     // Validate the phone number
  // const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits
  // if (!phoneRegex.test(formData.phone)) {
  //   toast.error("Phone number must be 10 digits and contain only numbers!");
  //   return;
  // }


    // Validate the form data (example)
    if (formData.password !== formData.repassword) {
      toast.error("Passwords do not match!"); // Show toast error
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data);
        toast.error("Signup failed! Please try again later"); // Show toast error
        throw new Error("Signup failed: ");
      }

      const data = await response.json();
      console.log("Signup successful", data);
      setErrors({});
      toast.success(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const [isAdmin, setIsAdmin] = useState(false);

  const handleClearError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };

  const handleRoleChange = (event) => {
    setIsAdmin(event.target.value === 'admin');
  };

  return (
    <>
      <div className="login-page d-flex justify-content-center vh-100">

        <div className="signup-container ps-3 me-3">
       <div className="text-center my-4">
        <h1 className="form-title mb-4">Sign up</h1>
        <p className="text-muted">Register and login into the system.</p>
       </div>
            <form onSubmit={handleSignup}>
              <div className="row px-2">
                <div className="col-12 d-flex gap-4 py-1">
                  <div className="col-6">
                    <Input
                      label="Firstname: "
                      name="firstname"
                      id="firstname"
                      placeholder="Enter your firstname"
                      type="text"
                      error={errors.firstname}
                      onClearError={() => handleClearError("firstname")}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      label="Lastname: "
                      name="lastname"
                      id="lastname"
                      placeholder="Enter your lastname"
                      type="text"
                      error={errors.lastname}
                      onClearError={() => handleClearError("lastname")}
                    />
                  </div>
                </div>
                <div className="col-12 d-flex gap-4 py-1">
                  <div className="col-6">
                    <Input
                      label="Username: "
                      name="username"
                      id="username"
                      placeholder="Enter your username"
                      type="text"
                      error={errors.username}
                      onClearError={() => handleClearError("username")}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      label="Email: "
                      name="email"
                      id="email"
                      placeholder="Enter your email address"
                      type="email"
                      error={errors.email}
                      onClearError={() => handleClearError("email")}
                    />
                  </div>
                </div>
                <div className="col-12 d-flex gap-4 py-1">
                  <div className="col-6">
                    <Input
                      label="Phone no.: "
                      name="phone"
                      id="phone"
                      placeholder="Enter your phone number"
                      type="number"
                      error={errors.phone}
                      onClearError={() => handleClearError("phone")}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select className="form-select form-control" name="role" id="role" onChange={handleRoleChange} defaultValue="user">
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
                {isAdmin && (
                  <div>
                    <Input
                      label="Admin Auth Code: "
                      name="adminAuthCode"
                      id="adminAuthCode"
                      placeholder="Enter the secret admin key"
                      type="text"
                      onClearError={() => handleClearError("adminAuthCode")}
                    />
                    {errors.adminAuthCode && <p className="error">{errors.adminAuthCode}</p>}
                  </div>
                )}
                <div className="col-12 d-flex gap-4 py-1">
                  <div className="col-6">
                    <Input
                      label="Password: "
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      error={errors.password}
                      onClearError={() => handleClearError("password")}
                    />
                  </div>
                  <div className="col-6">
                    <Input
                      label="Re-password: "
                      name="repassword"
                      id="repassword"
                      placeholder="Enter your repassword"
                      type="password"
                      onClearError={() => handleClearError("repassword")}
                    />
                  </div>
                </div>
                <div className="col-12 d-flex gap-4 py-1">
                  <Input
                    select
                    label="Blood Group: (Select your blood group)"
                    name="bloodType"
                    options={[
                      { value: "A+", label: "A+" },
                      { value: "A-", label: "A-" },
                      { value: "B+", label: "B+" },
                      { value: "B-", label: "B-" },
                      { value: "AB+", label: "AB+" },
                      { value: "AB-", label: "AB-" },
                      { value: "O+", label: "O+" },
                      { value: "O-", label: "O-" },
                    ]}
                  />
                </div>
              </div>
              <div>
                <button type="submit" className="btn my-5 mx-3" id="btnSignup">
                  Sign up
                </button>
              </div>
            </form>
      
          <p className="text-muted text-center">
              Already have an account?<br/>
            <Link to="/login" className="btn btn-sm btn-outline-dark my-2">
            Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
};

export default Signup;
