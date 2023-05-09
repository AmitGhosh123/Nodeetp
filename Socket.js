var express = require('express');
var app = express();
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://0.0.0.0/chat', { useNewUrlParser: true })
  .then(() => console.log())
  .catch(err => console.log(err));

const msgSchema = new mongoose.Schema({
   data:String,
   reg:Number
   });

app.get('/', function(req, res) {
   res.sendFile( __dirname + "/" + "Socket.html" ); 
});
app.post('/insert-data', function(req, res) {
      const Msg = mongoose.model('messages', msgSchema)
      let data = new Msg(req.body)
      let reg = new Msg(req.body)
      data.save()
      reg.save()
      res.send("Thankyou");
});

io.on('connection', function(socket) {
   socket.on('clientEvent', function(data) {
      console.log(data);
   });
});

http.listen(3200, function() {
   console.log('listening on localhost:3200');
});
