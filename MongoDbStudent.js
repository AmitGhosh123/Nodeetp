const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// connect to MongoDB
mongoose.connect('mongodb://0.0.0.0/students', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// create a schema for student details
const studentSchema = new mongoose.Schema({
  studentId: Number,
  name: String,
  subject: String,
  branch: String,
  marks: Number
});

// create a model for student details
const Student = mongoose.model('Student', studentSchema);

app.get('/', function(req, res) {
   res.sendFile( __dirname + "/" + "MongoDbStudent.html" ); 
});

// set up a route to handle the form submission
app.post('/add', (req, res) => {
  const studentId = parseInt(req.body.studentId);
  const name = req.body.name;
  const subject = req.body.subject;
  const branch = req.body.branch;
  const marks = parseInt(req.body.marks);

  // create a new student object
  const newStudent = new Student({
    studentId: studentId,
    name: name,
    subject: subject,
    branch: branch,
    marks: marks
  });

  // save the new student to the database
  newStudent.save()
    .then(() => {
      res.send(`Student details added: ${newStudent}`);
    })
    .catch(err => {
      console.log(err);
      res.send('Error saving student details to database');
    });
});

// start the server
app.listen(3200, () => console.log('Server started on port 3200'));
