const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// connect to MongoDB
mongoose.connect('mongodb://0.0.0.0/arithmetic', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// create a schema for the result model
const resultSchema = new mongoose.Schema({
  num1: Number,
  num2: Number,
  result: Number
});

// create a model for the result
const Result = mongoose.model('Result', resultSchema);

app.get('/', function(req, res) {
   res.sendFile( __dirname + "/" + "Mongo.html" ); 
});

// set up a route to handle the form submission
app.post('/add', (req, res) => {
  const num1 = parseInt(req.body.num1);
  const num2 = parseInt(req.body.num2);
  const result = num1 + num2;

  // create a new result object
  const newResult = new Result({
    num1: num1,
    num2: num2,
    result: result
  });

  // save the new result to the database
  newResult.save()
    .then(() => {
      res.send(`Result: ${result}`);
    })
    .catch(err => {
      console.log(err);
      res.send('Error saving result to database');
    });
});

// start the server
app.listen(3200, () => console.log('Server started on port 3000'));
