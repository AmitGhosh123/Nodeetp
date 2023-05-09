// create a node.js application that takes a number 'n' as a user input and calculates the sum of n natural numbers and store result in a file "result.txt" which already exists. 
// Also ,"Success" message gets printed on console in case of success and "error occurred" gets displayed on console if any error occurs.

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a number: ', (number) => {
  const sum = calculateSum(parseInt(number));
  fs.writeFile('result.txt', sum.toString(), (err) => {
    if (err) {
      console.error('error occurred:', err);
    } else {
      console.log('Success');
    }
  });
  rl.close();
});

function calculateSum(n) {
  return (n *(n+1))/2;
}