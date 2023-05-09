const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Set up body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to serve the HTML form
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>User Input Form</title>
      </head>
      <body>
        <h1>User Input Form</h1>
        <form method="POST" action="/submit">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>

          <label for="age">Age:</label>
          <input type="number" id="age" name="age" required>

          <label for="gender">Gender:</label>
          <select id="gender" name="gender" required>
            <option value="">--Please select an option--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

// Route to handle form submission and write to file
app.post('/submit', (req, res) => {
  const { name, age, gender } = req.body;
  const data = { name, age, gender };

  fs.writeFile('data.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Data written to file');
    res.redirect('/data');
  });
});

// Route to read data from file and display on server or webpage
app.get('/data', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    const { name, age, gender } = JSON.parse(data);
    res.send(`
      <html>
        <head>
          <title>User Data</title>
        </head>
        <body>
          <h1>User Data:</h1>
          <p>Name: ${name}</p>
          <p>Age: ${age}</p>
          <p>Gender: ${gender}</p>
        </body>
      </html>
    `);
  });
});

app.listen(3300, () => console.log('Server running on port 3300'));
