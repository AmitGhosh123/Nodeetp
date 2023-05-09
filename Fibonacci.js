const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve the HTML form
    const html = `
      <html>
      <head>
        <title>Fibonacci Calculator</title>
      </head>
      <body>
        <h1>Fibonacci Calculator</h1>
        <form method="POST" action="/fibonacci">
          <label for="n">Enter a number:</label>
          <input type="number" name="n" required>
          <button type="submit">Calculate Fibonacci Number</button>
        </form>
      </body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.write(html);
    return res.end();
  } else if (req.method === 'POST' && req.url === '/fibonacci') {
    // Read the request body and extract the input value
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const n = parseInt(body.split('=')[1]);

      // Calculate the nth Fibonacci number using a recursive function
      const fib = (n) => {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
      }
      const result = fib(n);

      // Send the result as an HTTP response
      res.setHeader('Content-Type', 'text/plain');
      res.write(`The ${n}th Fibonacci number is ${result}`);
      return res.end();
    });
  } else {
    // Handle invalid requests
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const port = 3100;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
