import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { content: message, timestamp: new Date() });
      setMessage("");
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Chat Room</Typography>
      <Box>
        {messages.map((msg, index) => (
          <Typography key={index}>{msg.content}</Typography>
        ))}
      </Box>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <Button onClick={sendMessage}>Send</Button>
    </Box>
  );
}

export default ChatRoom;
