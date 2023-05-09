const express = require('express');
const { check, validationResult } = require('express-validator');
const app = express();
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));

const PORT =  3100;

app.get('/', (req, res) => {
  res.send(`
    <form method="post" action="/submit">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <br>
      <label for="regNo">Registration Number:</label>
      <input type="text" id="regNo" name="regNo" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <label for="mobile">Mobile Number:</label>
      <input type="text" id="mobile" name="mobile" required>
      <br>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', [
  check('name').notEmpty().withMessage('Name is required.')
    .isLength({ min: 2, max: 30 }).withMessage('Name must be between 2 and 30 characters.'),
  check('regNo').notEmpty().withMessage('Registration number is required.')
    .isLength({ min: 3, max: 10 }).withMessage('Registration number must be between 3 and 10 characters.'),
  check('email').notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email address.'),
  check('mobile').notEmpty().withMessage('Mobile number is required.')
    .isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits.')
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, regNo, email, mobile } = req.body;

  const data = `Name: ${name} 
    Registration No: ${regNo} 
    Email: ${email} 
    Mobile: ${mobile}\n`;

  fs.appendFile('validator.txt', data, (err) => {
    if (err) {
      console.error(err);
      res.send('Error occurred while saving data!');
    } else {
      console.log('Data saved to file!');
      res.send('Data saved successfully!');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});