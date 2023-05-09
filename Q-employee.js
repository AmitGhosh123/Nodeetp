//1 
// function Employee(name, salary) {
//     this.name = name;
//     this.salary = salary;
//   }
  
//   Employee.prototype.calculateTax = function() {
//     let taxPercentage = 0;
    
//     if (this.salary < 50000) {
//       console.log(`Tax not applicable for ${this.name}`);
//     } else if (this.salary >= 50000 && this.salary < 100000) {
//       taxPercentage = 10;
//       console.log(`Tax applicable upto ${taxPercentage}% for ${this.name}`);
//     } else if (this.salary >= 100000 && this.salary < 150000) {
//       taxPercentage = 20;
//       console.log(`Tax applicable upto ${taxPercentage}% for ${this.name}`);
//     } else {
//       taxPercentage = 30;
//       console.log(`Tax applicable upto ${taxPercentage}% for ${this.name}`);
//     }
//   };
  
//   const employee1 = new Employee('John', 45000);
//   employee1.calculateTax(); // Tax not applicable for John
  
//   const employee2 = new Employee('Jane', 80000);
//   employee2.calculateTax(); // Tax applicable upto 10% for Jane
  
//   const employee3 = new Employee('Mike', 120000);
//   employee3.calculateTax(); // Tax applicable upto 20% for Mike
  
//   const employee4 = new Employee('Sarah', 200000);
//   employee4.calculateTax(); // Tax applicable upto 30% for Sarah
  
  //2
  // Import the required modules
const EventEmitter = require('events');

// Define the Employee class
class Employee extends EventEmitter {
  constructor(name, basicPay, hra, da) {
    super();
    this.name = name;
    this.basicPay = basicPay;
    this.hra = hra;
    this.da = da;
  }

  // Calculate the salary of the employee and emit an event with the result
  calculateSalary() {
    const salary = this.basicPay + this.hra + this.da;
    this.emit('salaryCalculated', this.name, salary);
  }
}

// Create a new employee object
const johnDoe = new Employee('John Doe', 50000, 20000, 10000);

// Listen for the 'salaryCalculated' event and log the result on the console
johnDoe.on('salaryCalculated', (name, salary) => {
  console.log(`The salary of ${name} is ${salary}`);
});

// Calculate the salary of the employee
johnDoe.calculateSalary();
