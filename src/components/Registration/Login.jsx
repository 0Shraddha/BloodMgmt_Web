import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/Input.scss'; // Ensure this file is styled as per new design
import Input from "./Input"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data);
        throw new Error('Login failed. Please correct the information before submission.');
      }

      const data = await response.json();
      const userToken = {
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        role: data.user.role,
        username: data.user.username,
      };
      localStorage.setItem('userToken', JSON.stringify(userToken));
      localStorage.setItem('token', data.token);
      setErrors({});


      toast.success('Login successful!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
        toast.error(err.message)
      
    }
  };
  
  const handleClearError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };

  return (
    <div className="login-page d-flex justify-content-center vh-100">
      <ToastContainer position="top-right" autoClose={3000} />

   
      <div className="login-form-container col-md-6 d-flex flex-column justify-content-center align-items-center px-5">
        <h1 className="form-title mb-4">Welcome back!</h1>
        <p className="text-muted">Enter your email and password to log in.</p>

        <form className="w-100" onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              className="form-control rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              onClearError={() => handleClearError("email")}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              className="form-control rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              onClearError={() => handleClearError("password")}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ms-2">Remember me</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 rounded" style={{ backgroundColor : '#405189'}}>
            Log in
          </button>
        </form>

        <p className="text-muted mt-4">
          Don’t have an account? <Link to="/signup" className="text-primary">Register here</Link>
        </p>

      </div>

     
    </div>
  );
};

export default Login;
