const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();
require('dotenv').config();
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(clientId,clientSecret,"http://localhost:3000"); // your Google client ID

// Sign Up
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashPassword, authType: 'local' });
    await user.save();

    res.status(200).json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    // If user signed up via Google
    if (user.authType === 'google') {
      return res.status(400).json({ msg: "Please login using Google" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    // Generate JWT token
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ msg: "Login Successful", user, token: jwtToken });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Google Login
router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        password: googleId,  // Google sub as password substitute
        authType: 'google',
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ msg: "Google Login Successful", user, token: jwtToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Invalid Google token" });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Prevent password reset for Google users
    if (user.authType === 'google') {
      return res.status(400).json({ msg: "Cannot reset password for Google users" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    await user.save();

    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
