import React, { useState } from 'react';
import Input from './Input';
import '../../Styles/Input.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { BiSolidDonateBlood } from 'react-icons/bi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Login failed. Please try again.');
      }
  
      const data = await response.json();

       // Store the relevant data in local storage
    const userToken = {
      firstname: data.user.firstname,
      lastname: data.user.lastname,
      role: data.user.role,
      username: data.user.username,
    };
    localStorage.setItem('userToken', JSON.stringify(userToken));


      console.log('response', data);
      toast.success("Login successful!");
  
      // Store token in localStorage
      localStorage.setItem('token', data.token);
  
      setTimeout(() => {
        navigate("/dashboard"); // Redirect after 2 seconds
      }, 2000);
  
    } catch (err) {
      console.error(err);
      toast.error(err.message); // Display error message in toast
    }
  };
  

  return (
    <div className="form-container d-flex justify-content-center mt-5">
      <div className="login-container row">
      <ToastContainer position="top-right" autoClose={3000} />


    <div className='col-12'>
      <h2 className="py-3 form-heading text-center">Login</h2>
		</div>
    <div className='col-11'>
      <form className="py-2 ps-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="text"
          placeholder="Enter your email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <button type="submit" className="btn my-2 mx-1" id="btnSubmit">
            Login
          </button>
        </div>
      </form>
    </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p className="text-muted text-center">
        Don't have an account?<br/>
        <Link to="/signup" className="btn btn-sm btn-outline-dark my-2">
          Sign up
        </Link>
      </p>
    </div>
    </div>

  );
};

export default Login;
