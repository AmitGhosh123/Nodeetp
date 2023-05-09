// Q. Implement a Node js application to create a writable stream with a new sample. txt file
// and perform the following tasks
// Find the prime numbers up to 100 and write the values to the sample. txt file with the writable stream
// b) Display the message *Task Completed at the end in the console window.

const fs = require('fs');
function isPrime(num) {
 if (num <= 1) {
 return false;
 }
 for (let i = 2; i <= Math.sqrt(num); i++) {
 if (num % i === 0) {
 return false;
 }
 }
 return true;
}
const writeStream = fs.createWriteStream('sample.txt');
for (let i = 2; i <= 100; i++) {
 if (isPrime(i)) {
 writeStream.write(`${i}\n`);
 }
}
writeStream.end();
writeStream.on('finish', () => {
console.log('Task Completed');
});

