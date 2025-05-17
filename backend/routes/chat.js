const express = require('express');
const router = express.Router();
const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/chat
// Accepts user message and returns AI response using OpenAI API
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error in /api/chat:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
