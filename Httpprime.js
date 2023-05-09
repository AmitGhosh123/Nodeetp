const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  const queryParams = querystring.parse(reqUrl.query);

  // If the request is for the root route, serve the HTML form
  if (reqUrl.pathname === '/') {
    const html = `
      <form method="GET" action="/check">
        <label for="number">Enter a number:</label>
        <input type="number" name="number" required>

        <button type="submit">Check Prime</button>
      </form>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.write(html);
    res.end();
  }

  // If the request is for the /check route, check if the number is prime
  if (reqUrl.pathname === '/check') {
    const number = parseInt(queryParams.number);

    // Check if the number is prime
    let isPrime = true;
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        isPrime = false;
        break;
      }
    }

    // Send the response with the result
    const response = {
      number,
      isPrime,
    };
    res.setHeader('Content-Type', 'text');
    res.write(JSON.stringify(response));
    res.end();
  }
});

const port = 3100;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
