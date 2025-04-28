import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email,
        newPassword,
      });
      alert("Password updated successfully! Please login again.");
      navigate('/login'); // ✅ Go back to login
    } catch (error) {
      alert(error.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form 
        className="p-4 shadow bg-white rounded" 
        style={{ minWidth: '550px' }} 
        onSubmit={handleForgotPassword}
      >
        <h2 className="mb-3 text-center text-primary">Forgot Password</h2>
        
        <div className="mb-3">
          <label>Email address <span className="text-danger">*</span></label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>New Password <span className="text-danger">*</span></label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Reset Password</button>

        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none">← Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
