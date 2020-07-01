const express = require("express"); // this returns a function
const app = express(); // call this function to return an object of type 'Express'
// The 'app' object conventionally denotes the Express application

// implement a couple of endpoints that respond to an http get request

// this is how we define a route: specify a path/url,
// and a callback function which is also called a 'route handler'
app.get("/", (request, response) => {
  response.send("Hello Worlds!!!");
});

app.get("/api/courses", (req, res) => {
  // in a real scenario here we want to get a list of courses from the database and return them
  res.send([1, 2, 3]); // so here we instead simply return an array of numbers
});

app.listen(3000, () => console.log("listening on port 3000..."));
// optionally call a function when app starts to listen on a given port
