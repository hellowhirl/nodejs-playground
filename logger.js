// let's create a module for logging messages
// we will reuse this module in varoius parts of the application or potentially other applications

var url = "http://fakelogger.io/log"; // imagine we will send http request to this endpoint

function log(message) {
  // Send an HTTP request
  console.log(message);
}

// anything we add to 'exports' module will be available outside this module
// module.exports.log = log; // for exporting an object from this module - useful for exporting multiple methods & properties

module.exports = log; // setting 'exports' to a single function - then we can call it directly

// below is implementation detail, so we don't want to export it to outside - keeps this module easy to use
// module.exports.endPoint = url; // we can also rename to different name like 'endPoint'
