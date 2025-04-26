import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "550px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input type="text" className="form-control" id="name" required placeholder="Enter your name" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input type="email" className="form-control" id="email" required placeholder="Enter your email" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <input type="password" className="form-control" id="password" required placeholder="Enter your password" />
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
      </div>
    </div>
  );
}

export default SignUp;
