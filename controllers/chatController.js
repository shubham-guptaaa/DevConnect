const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.postMessage = async (req, res) => {
    try {
        const { userId, content } = req.body;

        const message = new Message({ userId, content });
        await message.save();

        res.status(201).json({ message: 'Message posted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
