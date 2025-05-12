const express = require('express');
const router = express.Router();

// POST /api/chat
// Accepts user message and returns AI response (mock implementation)
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // TODO: Integrate with document-based AI chat logic here

    // Mock AI response
    const aiResponse = `You said: ${message}`;

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
