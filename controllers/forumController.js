const ForumPost = require('../models/ForumPost');

exports.getPosts = async (req, res) => {
    try {
        const posts = await ForumPost.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { userId, title, content } = req.body;

        const post = new ForumPost({ userId, title, content });
        await post.save();

        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
