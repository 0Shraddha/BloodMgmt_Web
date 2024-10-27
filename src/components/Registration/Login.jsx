import React, { useState } from 'react';
import Input from './Input';
import '../../Styles/Input.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/center', {
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
      console.log('response', data);
    } catch (err) {
      console.error(err);
      setError(err.message); // Display error message if request fails
    }
  };

  return (
    <div className="login-container align-items-center">
      <h2 className="py-3 form-heading text-center">Login</h2>

      <form className="py-4 px-5" onSubmit={handleSubmit}>
        <Input
          label="Username"
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
          <button type="submit" className="btn" id="btnSubmit">
            Login
          </button>
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p className="text-muted text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="btn btn-sm btn-outline-dark">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
