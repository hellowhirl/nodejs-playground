const Joi = require("@hapi/joi"); // a class is returned from this module so we should capitalize "Joi"
const express = require("express"); // this returns a function
const app = express(); // call this function to return an object of type 'Express'
// The 'app' object conventionally denotes the Express application

// be default this feature is not enabled in Express
app.use(express.json()); // adding a piece of middleware - then we use it in request processing pipeline

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// implement a couple of endpoints that respond to an http get request

// this is how we define a route: specify a path/url,
// and a callback function which is also called a 'route handler'
app.get("/", (request, response) => {
  response.send("Hola Mundo!!!");
});

app.get("/api/courses", (req, res) => {
  // in a real scenario here we want to get a list of courses from the database and return them
  // res.send([1, 2, 3]); // so here we instead simply return an array of numbers
  // res.send({ test: true }); //
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  // Validate
  const { error } = validateCourse(req.body);

  // If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message); // 'result.error' object is too complex to send to the client

  const course = {
    id: courses.length + 1, // because we are not using a DB here
    name: req.body.name, // we read this from 'body' of request - we assume there is a "name" property
  };
  courses.push(course); // pushing to our array that we defined above
  res.send(course); // return this "course" object to the client because client most likely needs this data
});

app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id)); // will return a boolean value
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  // bug fix: exit this route handler otherwise rest of bottom code will be executed - more elegant

  // Validate
  const { error } = validateCourse(req.body);

  // If invalid, return 400 - Bad request
  if (error) {
    res.status(400).send(error.details[0].message); // 'result.error' object is too complex to send to the client
    return; // 'return' because we don't want the rest of the function to be executed
  }

  // Update coures
  course.name = req.body.name;

  // Return the updated coures
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id)); // will return a boolean value
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  // new way to set schema in Joi
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  // const result = schema.validate(req.body);
  return schema.validate(course); // no need to define constant
}

// Route paramter :id
app.get("/api/courses/:id", (req, res) => {
  // res.send(req.params.id);
  // example: http://localhost:3000/api/posts/2018/1

  //write some logic to look for the course with the given id
  const course = courses.find((c) => c.id === parseInt(req.params.id)); // will return a boolean value
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  // res.send(req.params); // how to view all parametrs passed - http://localhost:5000/api/posts/2018/3?sortBy=name
  res.send(req.query); // viewing additional optional parameters - http://localhost:5000/api/posts/2018/3?sortBy=name
});

// PORT - set environement variable with the 'process' object
const port = process.env.PORT || 3000; // "PORT" is name of our environement variable; either use it or an arbitrary number

app.listen(port, () => console.log(`listening on port ${port}...`));
// optionally call a function when app starts to listen on a given port
