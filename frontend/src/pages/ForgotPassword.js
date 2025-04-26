import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Password reset link sent to your email!');
    // You can connect your backend API here
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form className="p-4 shadow bg-white rounded" style={{ minWidth: '550px' }} onSubmit={handleSubmit}>
        <h2 className="mb-3 text-center text-primary">Forgot Password</h2>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none">← Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
