const express = require('express');
const { getPosts, createPost } = require('../controllers/forumController');
const router = express.Router();

// Get forum posts
router.get('/', getPosts);

// Create a new forum post
router.post('/', createPost);

module.exports = router;
