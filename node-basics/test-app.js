// Node will give this file to V8 engine for execution
function sayHello(name) {
  console.log("hello " + name);
}

sayHello("Chad");
// console.log(window) // will not work because 'window' and 'document' objects not available

// below are global objects in Node (global scope)
console.log("example");
// setTimeout();
// clearTimeout();
// setInterval(); // used to repetively call a function after a given delay
// clearInterval(); // stop that function from being called repetitively

console.log("X"); // in browser JS engine will prefix this with window.console.log('X') - because that's where this object is defined

var message = ""; // similarly in browser this is prefixed as window.message - and it is added to the global scope by default

// in Node there is no 'window' object, instead we use 'global'
// however, variables and functions we define here are not added to the global object
console.log(global.message); // so will return 'undefined', because it is only scoped to this file

// in order to build reliable and maintainable applications we should avoid defining variables and functions in global scope
// instead we use modularity with modules (like building blocks)
// this will prevent two variables or functions with same names overriding somewhere else

// in Node the variables and functions defined in a file are scoped to that file - they are private (OOP terms)
// if you want to use those members outside of the module, you need to export it to make it public

// every Node application has at least one file(module) which we call the 'Main Module' - like 'app.js'
console.log(module); // returns a JSON object for Module with properties like 'id', filename, etc.
