import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // for redirecting after signup

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });
      alert("Signup successful! Please login.");
      navigate('/login'); // redirecting to login page after signup
    } catch (error) {
      alert(error.response.data.msg || "Signup failed.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const res = await axios.post('http://localhost:5000/api/auth/google-login', { token });

      console.log('User from server:', res.data.user);

      // Save the token in localStorage
      localStorage.setItem('token', res.data.token); // Store the token

      // Optional: Save user _id for session reference (if needed)
      localStorage.setItem('userId', res.data.user._id);

      window.location.href = '/dashboard'; // Redirect to dashboard
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
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "550px" }}>
        
        {/* Home icon at the top right */}
        <div className="d-flex justify-content-end mb-3">
          <Link to="/" className="text-decoration-none">
            <i
              className="bi bi-house-door-fill"
              style={{
                fontSize: "2.5rem",
                color: "#0d6efd", // Bootstrap blue
                transition: "color 0.3s",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => (e.target.style.color = "#6610f2")} // Violet on hover
              onMouseLeave={(e) => (e.target.style.color = "#0d6efd")} // Back to blue
              title="Go to Home"
            ></i>
          </Link>
        </div>

        <h2 className="text-center mb-4">Sign Up</h2>
        
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              required 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              required 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              required 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>

          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <p className="text-center mt-1">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </form>

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
              text="signup_with"
              theme="outline"
              ux_mode="popup"
            />
          </div>
        </GoogleOAuthProvider>

      </div>
    </div>
  );
}

export default SignUp;
