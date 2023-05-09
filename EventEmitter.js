/* In Node.js, the EventEmitter class is a core module that provides an 
implementation of the observer pattern. The EventEmitter allows you to 
create and emit custom events, and also to listen for those events and 
execute a function when they are emitted. */

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
// Listen for the 'event' event
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
// Emit the 'event' event
myEmitter.emit('event');


const mmyEmitter = new MyEmitter();
// Listen for the 'event' event with a callback that logs the passed data
mmyEmitter.on('event', (data) => {
  console.log(`an event occurred with data: ${data}`);
});
// Emit the 'event' event with some data
mmyEmitter.emit('event','some data');