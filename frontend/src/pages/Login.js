import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // to redirect after login

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      alert("Login successful!");
      navigate('/dashboard'); // ✅ You can change '/dashboard' to your actual page
    } catch (error) {
      alert(error.response.data.msg || "Login failed.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '450px', borderRadius: '15px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email address <span className="text-danger">*</span></label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter your email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password <span className="text-danger">*</span></label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter your password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        {/* Forgot password + signup link */}
        <div className="text-center mt-3">
          <p className="mb-1">
            <Link to="/forgot-password" className="text-danger" style={{ textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </p>
          <p className="mb-0">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary fw-bold" style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
