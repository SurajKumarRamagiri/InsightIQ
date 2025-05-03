const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const Document = require('../models/Document');

// Middleware to check authentication
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf and .docx files are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

// Upload route
router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type' });
  }
  try {
    const newDocument = new Document({
      user: req.user.id,
      filename: req.file.filename || req.file.originalname,
      originalname: req.file.originalname,
      contentType: req.file.mimetype,
      fileData: req.file.buffer
    });
    await newDocument.save();
    res.status(200).json({ message: 'File uploaded and stored in database successfully', documentId: newDocument._id });
  } catch (error) {
    res.status(500).json({ message: 'Error saving file to database', error: error.message });
  }
});

module.exports = router;
