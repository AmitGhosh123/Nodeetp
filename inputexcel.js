const express = require('express');
const bodyParser = require('body-parser');
const { EventEmitter } = require('events');
const ExcelJS = require('exceljs');

const app = express();
const emitter = new EventEmitter();

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Handle form submission
app.post('/submit', (req, res) => {
  const { subject1, subject2, subject3, subject4, subject5 } = req.body;
  
  // Calculate CGPA based on entered marks
  const totalMarks = parseFloat(subject1) + parseFloat(subject2) + parseFloat(subject3) + parseFloat(subject4) + parseFloat(subject5);
  const cgpa = totalMarks / 50;
  
  // Emit "cgpa-calculated" event with calculated CGPA as the argument
  emitter.emit('cgpa-calculated', cgpa);
  
  // Send response to client
  res.send(`Your CGPA is ${cgpa.toFixed(2)}`);
});

// Handle "cgpa-calculated" event
emitter.on('cgpa-calculated', cgpa => {
  // Create new workbook
  const workbook = new ExcelJS.Workbook();
  
  // Add new worksheet
  const worksheet = workbook.addWorksheet('CGPA');
  
  // Add headers
  worksheet.addRow(['Subject', 'Marks']);
  
  // Add data
  worksheet.addRow(['Subject 1', req.body.subject1]);
  worksheet.addRow(['Subject 2', req.body.subject2]);
  worksheet.addRow(['Subject 3', req.body.subject3]);
  worksheet.addRow(['Subject 4', req.body.subject4]);
  worksheet.addRow(['Subject 5', req.body.subject5]);
  worksheet.addRow(['CGPA', cgpa.toFixed(2)]);
  
  // Save workbook to file
  workbook.xlsx.writeFile('cgpa.xlsx')
    .then(() => console.log('CGPA saved to cgpa.xlsx'))
    .catch(error => console.error(error));
});

// Serve HTML file with form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>CGPA Calculator</title>
      </head>
      <body>
        <form method="post" action="/submit">
          <label for="subject1">Subject 1:</label>
          <input type="text" id="subject1" name="subject1" required><br>

          <label for="subject2">Subject 2:</label>
          <input type="text" id="subject2" name="subject2" required><br>

          <label for="subject3">Subject 3:</label>
          <input type="text" id="subject3" name="subject3" required><br>

          <label for="subject4">Subject 4:</label>
          <input type="text" id="subject4" name="subject4" required><br>

          <label for="subject5">Subject 5:</label>
          <input type="text" id="subject5" name="subject5" required><br>

          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

// Start server
const port = 3100;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});