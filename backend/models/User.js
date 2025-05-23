const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google users
  googleId: { type: String }, // New field for Google OAuth
  picture: { type: String },  // Optional user avatar
  authType: { type: String }, // Added authType field to match auth routes
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
