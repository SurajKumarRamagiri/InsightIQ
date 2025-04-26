// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">InsightIQ</Link>
      <div>
        <Link className="btn btn-outline-light" to="/register">Get Started</Link>
      </div>
    </nav>
  );
}

export default Navbar;
