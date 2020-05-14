/*jshint esversion: 6 */ // wow, this removes unncessary JSHint error about const

// best practice is to use 'const' when loading a module
const log = require("./logger"); // function to laad a module - only available in Node
// require("./looger.js") // './' indicates current folder - Node auto adds .js extension, assuming it's a js file
// require("./subFolder/logger"); // if the 'logger' module is in a subfolder

// logger = 1; // with tools ike JSHint we can scan our JS code for errors

console.log(log); // we see '{ log: [Function: log] }', which means that we can call 'log' in this module
// logger.log("hello"); // previous implementatoin when we were exporting an object from 'logger' module
log("hello");
