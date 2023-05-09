//visitor in socket io

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const studentDetails = [
  { name: 'raze', age: 20, grade: 'A' },
  { name: 'reyna', age: 19, grade: 'B+' },
  { name: 'chamber', age: 21, grade: 'A-' },
  { name: 'jett', age: 22, grade: 'B' }
];
app.get('/', function(req, res) {
    res.sendFile( __dirname + "/" + "io.html" ); 
 });

let visitorCount = 0;

io.on('connection', socket => {
  console.log(`Client ${socket.id} connected`);

  visitorCount++;
  console.log(`Visitor count: ${visitorCount}`);

  if (visitorCount % 2 !== 0) {
    io.emit('odd-visitor-count', visitorCount);
  }

  console.log('Student Details:');
  console.log('-----------------');
  studentDetails.forEach(student => console.log(student));
});

server.listen(3300, () => {
  console.log('Server started on port 3300');
});
