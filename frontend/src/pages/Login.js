import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <div
        className="card p-5 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "550px",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg">
              Login
            </button>
          </div>

          <p className="text-center mt-3 mb-0">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <p className="text-center mt-1">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
