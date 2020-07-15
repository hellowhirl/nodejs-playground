console.log("__filename:", __filename); // represents complete path of file and includes file name
console.log("__dirname: ", __dirname); // represents path to directory that contains the file
// let's create a module for logging messages
// we will reuse this module in varoius parts of the application or potentially other applications

const EventEmitter = require("events"); // Pascal class indicates a Class
// const emitter = new EventEmitter(); // OK to delete this because we are extending class functionality of EventEmitter to Logger, and we replace with 'this'

var url = "http://fakelogger.io/log"; // imagine we will send http request to this endpoint

class Logger extends EventEmitter {
  log(message) {
    // Send an HTTP request
    console.log(message);

    // Raise an event here - should be in the logger module as it is the one signaling an event
    // 'emit' means making a noise (signaling something has happened)
    this.emit("messageLogged", { id: 1, url: "http://" }); // passing an event argument
    // this emitter iterates over all the registered event listeners and calls them synchronously
  }
}

// anything we add to 'exports' will be available outside this module

// module.exports.log = log; // for exporting an object from this module - useful for exporting multiple methods & properties
// exports.log = log; // 'exports' is shortcut for 'module.exports'

module.exports = Logger; // setting 'exports' to a single function - then we can call it directly

// exports = log; // can't do this because because 'exports' is a reference to 'module.exports'

// below is implementation detail, so we don't want to export it to outside - keeps this module easy to use
// module.exports.endPoint = url; // we can also rename to different name like 'endPoint'
