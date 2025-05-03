// backend/routes/dashboard.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken');

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from the header
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    req.user = decoded; // Store the decoded user data in req.user
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Dashboard route
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Find the user by ID from the token
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Send the user data back to the frontend
    res.json({
      name: user.name,
      email: user.email,
      // Include any other data you want to send to the frontend
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
