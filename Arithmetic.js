const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3200;

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware function to perform arithmetic operations on the input number
const arithmeticMiddleware = (req, res, next) => {
  const num = parseInt(req.body.number);
  if (!isNaN(num)) {
    req.arithmetic = {
      increment: num + 1,
      decrement: num - 1,
      square: num * num
    };
  }
  next();
};

// Serve the HTML page with a form to input a number
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <form method="POST" action="/">
          <label for="number">Enter a number:</label>
          <input type="text" id="number" name="number">
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `);
});

// Handle the form submission and display the arithmetic results
app.post('/', arithmeticMiddleware, (req, res) => {
  const arithmetic = req.arithmetic || {};
  res.send(`
    <html>
      <body>
        <p>Incremented value: ${arithmetic.increment || '-'}</p>
        <p>Decremented value: ${arithmetic.decrement || '-'}</p>
        <p>Squared value: ${arithmetic.square || '-'}</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});