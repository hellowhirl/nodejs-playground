console.log(__filename); // represents complete path of file and includes file name
console.log(__dirname); // represents path to directory that contains the file
// let's create a module for logging messages
// we will reuse this module in varoius parts of the application or potentially other applications

var url = "http://fakelogger.io/log"; // imagine we will send http request to this endpoint

function log(message) {
  // Send an HTTP request
  console.log(message);
}

// anything we add to 'exports' will be available outside this module

// module.exports.log = log; // for exporting an object from this module - useful for exporting multiple methods & properties
// exports.log = log; // 'exports' is shortcut for 'module.exports'

module.exports = log; // setting 'exports' to a single function - then we can call it directly

// exports = log; // can't do this because because 'exports' is a reference to 'module.exports'

// below is implementation detail, so we don't want to export it to outside - keeps this module easy to use
// module.exports.endPoint = url; // we can also rename to different name like 'endPoint'
