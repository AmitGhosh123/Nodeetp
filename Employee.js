// Q. Implement a Node.js application to create a readable stream with an
// employee.txt file (add basic employee details in the file. Read the student details
//     from the above stream and send the data as a response to the client request from
//     the browser.

//basic show text in the client side program 
    const fs = require('fs');
    const http = require('http');
    // Create a readable stream
    const readableStream = fs.createReadStream('employee.txt');
    // Create a HTTP server
    const server = http.createServer((req, res) => {
     // Set the response headers
     res.setHeader('Content-Type', 'text/plain');
     res.setHeader('Access-Control-Allow-Origin', '*');
     // Send the employee details as a response
     readableStream.pipe(res);
    });
    // Start the server and listen on a port
    const PORT = 3200;
    server.listen(PORT, () => {
     console.log(`Server listening on port ${PORT}`);
    });