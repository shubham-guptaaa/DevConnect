const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const Message = require('../models/Message');

const router = express.Router();

router.get('/messages', authenticateToken, async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 }).limit(50); // Fetch the last 50 messages
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

module.exports = router;
