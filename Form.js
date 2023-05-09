// Create a form having text boxes and  submit button, on the click of submit button the values
//   entered in the form should be printed on the webpage by using http module in node application

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(`<h1>Form Data</h1>
                 <p>Name: ${name}</p>
                 <p>Email: ${email}</p>
                 <p>Message: ${message}</p>`);
      res.end();
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html><body><h1>Form Example</h1>');
    res.write('<form action="/" method="POST">');
    res.write('<label for="name">Name:</label>');
    res.write('<input type="text" id="name" name="name"><br><br>');
    res.write('<label for="email">Email:</label>');
    res.write('<input type="email" id="email" name="email"><br><br>');
    res.write('<label for="message">Message:</label>');
    res.write('<textarea id="message" name="message"></textarea><br><br>');
    res.write('<input type="submit" value="Submit">');
    res.write('</form></body></html>');
    res.end();
  }
});

server.listen(3100, () => {
  console.log('Server running at http://localhost:3100');
});


