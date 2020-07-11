/*jshint esversion: 6 */ // wow, this removes unncessary JSHint error about const

// best practice is to use 'const' when loading a module
// const log = require("./logger"); // function to laad a module - only available in Node
// require("./looger.js") // './' indicates current folder - Node auto adds .js extension, assuming it's a js file
// require("./subFolder/logger"); // if the 'logger' module is in a subfolder

// logger = 1; // with tools ike JSHint we can scan our JS code for errors

// console.log(log); // we see '{ log: [Function: log] }', which means that we can call 'log' in this module
// logger.log("hello"); // previous implementatoin when we were exporting an object from 'logger' module
// log("hello");

////// Path

const path = require("path"); // access the Path Module by passing 'path' as the argument to 'require'
// nomrally Node assumes it is the built-in path module, otherwise it will look for existence of relative path to a file

var pathObj = path.parse(__filename); // one of the useful methods in the Path Module
// returns an object whose properties represent significant elements of the 'path'
// if we want to work with paths then it's easier to use the Path Module as opposed to working with strings

console.log("Path Object", pathObj);

////// OS
const os = require("os");

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log("Total Memory: " + totalMemory);
console.log("Free Memory: " + freeMemory);

////// File System
const fs = require("fs"); // comes with both syncronous and asyncronous methods - but should only use asynchronous
const files = fs.readdirSync("./"); // here we are seeing the Synchronous method because it's easier to understand
console.log("File System", files); // returns all files and folder in current directory as an array

fs.readdir("./", function (err, files) {
  if (err) console.log("Error!");
  // an unrecognized file/directory of '$' will trigger this error clause
  else console.log("readdir method from fs object", files);
}); // all these asynchrnous methods take a callback function as their last argument

////// Events

const EventEmitter = require("events"); // Pascal class indicates a Class

const Logger = require("./logger");
const logger = new Logger();

// Register a listener - order is important (listener comes before raising event)
// a listener is a function that will be called when that event is raised
logger.on("messageLogged", (arg) => {
  // some people also use 'e', 'eventArg', etc.
  console.log("listener called", arg); // we will see this in the console
});

logger.log("a message"); // renamed from 'logger' to 'Logger' because it's a class

////// Event Arguments
// quite often when we raise an event we also want to send some data about that event
// for example generating an id for a message, or it may give us a URL for accessing that message directly
