const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3100;

// Use body-parser to parse incoming form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the HTML form on the root route
app.get('/', (req, res) => {
  const html = `
    <form method="POST" action="/">
      <label for="regNo">Reg No:</label>
      <input type="text" name="regNo" required>

      <label for="name">Name:</label>
      <input type="text" name="name" required>

      <label for="grade">Grade:</label>
      <input type="text" name="grade" required>

      <button type="submit">Save Data</button>
    </form>
  `;
  res.send(html);
});

// Handle form submissions
app.post('/', (req, res) => {
  const { regNo, name, grade } = req.body;

  // Append the data to a text file on the server
  const data = `${regNo}, ${name}, ${grade}\n`;
  fs.appendFile('student.txt', data, err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
