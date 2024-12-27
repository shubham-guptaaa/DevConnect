import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Dashboard = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('token');

    // Establish socket connection when component mounts
    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
            query: { token }, // Send token with socket connection
        });
        setSocket(newSocket);

        // Listen for incoming messages
        newSocket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Listen for online users
        newSocket.on('onlineUsers', (users) => {
            setOnlineUsers(users);
        });

        return () => newSocket.close(); // Cleanup when component unmounts
    }, [token]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && socket) {
            socket.emit('sendMessage', message); // Emit message to server
            setMessage(''); // Clear input field
        }
    };

    // Fetch online users from the backend (if not using socket for this)
    useEffect(() => {
        const fetchOnlineUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/online-users', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in the request
                    },
                });
                const users = await response.json();
                setOnlineUsers(users); // Assuming API returns a list of users
            } catch (err) {
                console.error('Failed to fetch online users:', err);
            }
        };

        fetchOnlineUsers();
    }, [token]);

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {/* Live Chat Section */}
            <div className="col-span-2 bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Live Chat</h2>
                <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                    {messages.map((msg, index) => (
                        <div key={index} className="p-2 border-b">
                            {msg}
                        </div>
                    ))}
                </div>
                <form className="flex gap-2" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        className="flex-1 px-4 py-2 border rounded-lg"
                        placeholder="Type your message..."
                        value={message}
                        onChange={handleMessageChange}
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#4A8DB7] text-white rounded-lg hover:bg-[#2C5D77]"
                    >
                        Send
                    </button>
                </form>
            </div>

            {/* Online Developers Section */}
            <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Online Developers</h2>
                <ul>
                    {onlineUsers.map((user, index) => (
                        <li key={index} className="py-2 border-b">
                            {user.username} {/* Adjust according to your user data structure */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
