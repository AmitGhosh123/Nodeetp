//Q. show the usage of middleware


const express = require('express');
const app = express();

// Middleware function
const myMiddleware = function(req, res, next) {
  console.log('Middleware function called');
  next();
}

// Register middleware
app.use(myMiddleware);

// Route handler
app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Start server
app.listen(3100, function() {
  console.log('Server started on port 3100');
})

