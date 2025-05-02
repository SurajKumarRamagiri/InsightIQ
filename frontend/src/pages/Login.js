import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (error) {
      alert(error.response?.data?.msg || "Login failed.");
    }
  };


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
  
      const res = await axios.post('http://localhost:5000/api/auth/google-login', { token });
  
      console.log('User from server:', res.data.user);
  
      // Optional: Save user _id for session reference
      localStorage.setItem('userId', res.data.user._id);
  
      window.location.href = '/dashboard';
  
    } catch (err) {
      console.error(err);
      alert('Google login failed');
    }
  };
  

  const handleGoogleFailure = (error) => {
    console.log('Google login error:', error);
    // Handle Google login failure
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '450px', borderRadius: '15px' }}>
        
        {/* Home icon at the top right */}
        <div className="d-flex justify-content-end mb-3">
          <Link to="/" className="text-decoration-none">
            <i
              className="bi bi-house-door-fill"
              style={{
                fontSize: "2.5rem",
                color: "#0d6efd",
                transition: "color 0.3s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => (e.target.style.color = "#6610f2")}
              onMouseLeave={(e) => (e.target.style.color = "#0d6efd")}
              title="Go to Home"
            ></i>
          </Link>
        </div>

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

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1" />
          <span className="px-2 text-muted">or</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Google Login */}
        <GoogleOAuthProvider clientId="564151031047-6r1gp0202r6u4afkhffi29qt28kabi1t.apps.googleusercontent.com">
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              size="large"
              text="continue_with"
              theme="outline"
              ux_mode="popup"
            />
          </div>
        </GoogleOAuthProvider>

      </div>
    </div>
  );
};

export default Login;
