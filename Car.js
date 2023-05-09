// Q. a) Implement a Node.js application to connect with MongoDB to Create a
// database and add car collection with the fields- Model, Company, Mileage, color,
// and Owner. Add multiple documents with Employee data. Finally, Query the above
// collection to find employees with more than a specific salary and display it in the
// console window.
const { MongoClient } = require('mongodb');
const uri =
'mongodb://0.0.0.0/Cars';
// Replace <username>, <password>, <cluster>, and <dbname> with your own values
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology:
true });
client.connect(err => {
 if (err) throw err;
 const db = client.db('Cars');
 // Create a car collection with some fields
 const carCollection = db.collection('car');
 const cars = [
 { model: 'Model S', company: 'Tesla', mileage: 60000, color: 'Black', owner:
'John' },
 { model: 'Fiesta', company: 'Ford', mileage: 30000, color: 'Blue', owner:
'Jane' },
 { model: 'Camry', company: 'Toyota', mileage: 50000, color: 'Red', owner: 'Bob'
},
 { model: 'Accord', company: 'Honda', mileage: 40000, color: 'White', owner:
'Alice' }
 ];
 // Insert multiple documents into the car collection
 carCollection.insertMany(cars, (err, result) => {
 if (err) throw err;
 // Query the car collection to find employees with more than a specific salary
 const minMileage = 50000;
 carCollection.find({ mileage: { $gt: minMileage } }).toArray((err, docs) => {
 if (err) throw err;
 console.log(`Cars with mileage greater than ${minMileage}:`);
 console.log(docs);
 // Close the MongoDB connection
 client.close();
 });
 });
});
const http = require('http');
const querystring = require('querystring');
function factorial(n) {
 if (n === 0) {
 return 1;
 } else {
 return n * factorial(n - 1);
 }
}
const server = http.createServer((req, res) => {
 if (req.url === '/') {
 res.setHeader('Content-Type', 'text/html');
 res.write('<html>');
 res.write('<head><title>Factorial Calculator</title></head>');
 res.write('<body>');
 res.write('<form method="post" action="/calculate">');
 res.write('<label for="number">Enter a number:</label>');
 res.write('<input type="text" name="number" id="number">');
 res.write('<button type="submit">Calculate Factorial</button>');
 res.write('</form>');
 res.write('<p id="result"></p>');
 res.write('<script>');
 res.write('const form = document.querySelector("form");');
 res.write('const numberInput = document.getElementById("number");');
 res.write('const resultParagraph = document.getElementById("result");');
 res.write('form.addEventListener("submit", event => {');
 res.write('event.preventDefault();');
 res.write('const number = numberInput.value;');
 res.write('const request = new XMLHttpRequest();');
 res.write('request.onreadystatechange = () => {');
 res.write('if (request.readyState === 4 && request.status === 200) {');
 res.write('resultParagraph.textContent = request.responseText;');
 res.write('}');
 res.write('};');
 res.write('request.open("POST", "/calculate");');
 res.write('request.setRequestHeader("Content-Type", "application/x-www-formurlencoded");');
 res.write('request.send(`number=${number}`);');
 res.write('});');
 res.write('</script>');
 res.write('</body>');
 res.write('</html>');
 return res.end();
} else if (req.url === '/calculate' && req.method === 'POST') {
 let requestBody = '';
 req.on('data', chunk => {
 requestBody += chunk.toString();
 });
 req.on('end', () => {
 const { number } = querystring.parse(requestBody);
 const factorialNumbers = [];
 for (let i = 0; i <= number; i++) {
 factorialNumbers.push(factorial(i));
 }
 res.setHeader('Content-Type', 'text/plain');
 res.end(factorialNumbers.toString());
 });
 } else {
 res.statusCode = 404;
 res.setHeader('Content-Type', 'text/html');
 res.write('<html>');
 res.write('<head><title>404 Not Found</title></head>');
 res.write('<body><h1>404 Not Found</h1></body>');
 res.write('</html>');
 return res.end();
 }
});
const PORT = 3000;
server.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}`);
});