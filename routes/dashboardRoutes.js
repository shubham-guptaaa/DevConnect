// server/routes/dashboardRoutes.js
const express = require('express');
const authenticate = require('../utils/authenticate');
const router = express.Router();

// Example of a protected route
router.get('/dashboard', authenticate, (req, res) => {
    res.status(200).json({ message: 'Welcome to your Dashboard!' });
});

module.exports = router;
