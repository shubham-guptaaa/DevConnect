const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // For Socket.IO
const { Server } = require('socket.io'); // Import Socket.IO
require('dotenv').config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);

// Create HTTP server and setup Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Replace with your frontend's URL
        methods: ['GET', 'POST'],
    },
});

let onlineUsers = []; // To track online users

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Add user to the online users list
    const username = 'User' + socket.id; // Replace with actual username if available
    onlineUsers.push({ id: socket.id, username });

    // Emit updated online users to all connected clients
    io.emit('onlineUsers', onlineUsers);

    // Listen for messages
    socket.on('sendMessage', (message) => {
        console.log('Message received:', message);
        io.emit('message', message); // Broadcast message to all clients
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        onlineUsers = onlineUsers.filter(user => user.id !== socket.id);
        io.emit('onlineUsers', onlineUsers); // Emit updated list of online users
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
