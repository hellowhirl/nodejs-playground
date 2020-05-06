// node will give this file to V8 engine for execution
function sayHello(name) {
  console.log("hello " + name);
}

sayHello("Chad");
// console.log(window) // will not work because 'window' and 'document' objects not available
