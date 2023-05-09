
// Create a node js application to create a server and use url.parse() method to append the 
// contents into three files namely 'test1.txt', 'test2.txt' and 'test3.txt'
//  which are already existing. Also, if the url is not existing, an error must be displayed on the web page.
//http://localhost:3100/test2?data=world

const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Get the path from the URL
  const path = parsedUrl.pathname;

  // Check if the path is valid
  if (path !== '/test1' && path !== '/test2' && path !== '/test3') {
    res.statusCode = 404;
    res.end('Error: File not found');
    return;
  }

  // Get the file name from the path
  const fileName = path.substring(1) + '.txt';

  // Get the data from the query string
  const data = parsedUrl.query.data;

  // Append the data to the file
  fs.appendFile(fileName, data + '\n', (err) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end('Error: Internal server error');
      return;
    }

    res.statusCode = 200;
    res.end(`Data appended to ${fileName}`);
  });
});

const port = 3100;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
