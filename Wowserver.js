const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3100;
let intervalId = null;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Wowserver.html');
});

io.on('connection', (socket) => {
  console.log('A client connected');

  // start sending messages every 2 seconds
  intervalId = setInterval(() => {
    console.log('Sending "wow server" message to client');
    socket.emit('wow', 'wow server');
  }, 2000);

  // stop sending messages after 12 seconds
  setTimeout(() => {
    clearInterval(intervalId);
    console.log('Stopped sending messages');
    // wait for another 5 seconds and start sending messages again
    setTimeout(() => {
      console.log('Starting to send messages again');
      intervalId = setInterval(() => {
        console.log('Sending "wow server" message to client');
        socket.emit('wow', 'wow server');
      }, 2000);
    }, 5000);
  }, 12000);

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
