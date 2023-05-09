// Import the necessary modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Create an instance of the express app
const app = express();

// Create a new HTTP server using the express app
const server = http.createServer(app);

// Create a new instance of Socket.IO by passing the server object
const io = socketIO(server);

// Handle Socket.IO events
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages from clients
  socket.on('chat message', (msg) => {
    console.log('Message received: ' + msg);

    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnection events
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server and listen for incoming requests
server.listen(3100, () => {
  console.log('Server started on port 3100');
});
