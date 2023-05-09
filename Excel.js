const express = require('express');
const xlsx = require('xlsx');
const bodyParser = require('body-parser');
const app = express();
const port = 3100;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route to handle form submission
app.post('/', (req, res) => {
  // Get form data from request body
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  // Create a new workbook and sheet
  const workbook = xlsx.utils.book_new();
  const sheet = xlsx.utils.json_to_sheet([{ name, email, message }]);

  // Add sheet to workbook
  xlsx.utils.book_append_sheet(workbook, sheet, 'Form Data');

  // Write workbook to file
  xlsx.writeFile(workbook, 'form-data.xlsx');

  // Send response to client
  res.send('Form data saved!');
});

// Serve the HTML form to the client
app.get('/', (req, res) => {
  const formHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Form Example</title>
      </head>
      <body>
        <form action="/" method="POST">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name"><br><br>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email"><br><br>
          <label for="message">Message:</label>
          <textarea id="message" name="message"></textarea><br><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `;
  res.send(formHtml);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
