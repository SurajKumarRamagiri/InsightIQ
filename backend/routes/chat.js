const express = require('express');
const router = express.Router();
require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// POST /api/chat
// Accepts user message and returns AI response using Gemini API
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Using models.generateContent() as per the latest API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',  // Change model as needed
      contents: message,
    });

    const aiResponse = response.text;

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error in /api/chat:', error.response?.data ?? error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;