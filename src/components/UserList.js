import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("getUsers");
    socket.on("updateUserList", (userList) => setUsers(userList));
    return () => socket.off("updateUserList");
  }, []);

  return (
    <Box p={2} border={1} borderRadius={1}>
      <Typography variant="h6">Active Users</Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user.username} secondary={user.department} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default UserList;
