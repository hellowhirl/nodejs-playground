console.log('from "logger" module');
console.log("__filename:", __filename); // represents complete path of file and includes file name
console.log("__dirname: ", __dirname); // represents path to directory that contains the file
// let's create a module for logging messages
// we will reuse this module in varoius parts of the application or potentially other applications

const EventEmitter = require("events"); // Pascal class indicates a Class
// const emitter = new EventEmitter(); // OK to delete this because we are extending class functionality of EventEmitter to Logger, and we replace with 'this'

var url = "http://fakelogger.io/log"; // imagine we will send http request to this endpoint

// here we create class that has all the capabilities of EventEmitter and additional capabilities defined by us
class Logger extends EventEmitter {
  log(message) {
    // Send an HTTP request
    console.log("other message", message);

    // Raise an event here - should be in the logger module as it is the one signaling an event
    // here we use 'this' because we are using funcitonality from EventEmitter
    this.emit("messageLogged", { id: 1, url: "http://whatever" }); // passing an event argument
    // this emitter iterates over all the registered event listeners and calls them synchronously
  }
}

// anything we add to 'exports' will be available outside this module

// module.exports.log = log; // for exporting an object from this module - useful for exporting multiple methods & properties
// exports.log = log; // 'exports' is shortcut for 'module.exports' - it's an argument passed in our Module Wrapper Function

module.exports = Logger; // setting 'exports' to a single function or Class - then we can call it directly
// *** exports = Logger; // can't do this because because 'exports' is a reference to 'module.exports'

// below is implementation detail, so we don't want to export it to outside - keeps this module easy to use
// module.exports.endPoint = url; // we can also rename to different name like 'endPoint'

// module.exports.log = log; // exports as an object, useful if we have multiple properties/methods
// module.exports = log; // shorter syntax for exporting a single function
