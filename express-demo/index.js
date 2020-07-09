const express = require("express"); // this returns a function
const app = express(); // call this function to return an object of type 'Express'
// The 'app' object conventionally denotes the Express application

// implement a couple of endpoints that respond to an http get request

// this is how we define a route: specify a path/url,
// and a callback function which is also called a 'route handler'
app.get("/", (request, response) => {
  response.send("Hello Mundo!!!");
});

app.get("/api/courses", (req, res) => {
  // in a real scenario here we want to get a list of courses from the database and return them
  // res.send([1, 2, 3]); // so here we instead simply return an array of numbers
  res.send({ test: true }); // so here we instead simply return an array of numbers
});

// Route paramter :id
app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
  // example: http://localhost:3000/api/posts/2018/1
});

app.get("/api/posts/:year/:month", (req, res) => {
  // res.send(req.params); // how to view all parametrs passed
  res.send(req.query); // viewing additional optional parameters (http://localhost:5000/api/posts/2018/3?sortBy=name)
});

// PORT - set environement variable with the 'process' object
const port = process.env.PORT || 3000; // "PORT" is name of our environement variable; either use it or an arbitrary number

app.listen(port, () => console.log(`listening on port ${port}...`));
// optionally call a function when app starts to listen on a given port
