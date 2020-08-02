const startupDebugger = require("debug")("app:startup"); // require("debut") returns a function, so we pass an argument, an arbitrary namespace that we define for debugging
const dbDebugger = require("debug")("app:db");
const config = require("config");
const Joi = require("@hapi/joi"); // a class is returned from this module so we should capitalize "Joi"
const customMiddleware = require("./logger"); // returns an object with our exported methods
const express = require("express"); // this returns a function
const helmet = require("helmet"); // this also returns a function
const morgan = require("morgan");
const app = express(); // call this function to return an object of type 'Express'
// The 'app' object conventionally denotes the Express application

// Configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Example Mail Password: " + config.get("mail.password"));
// 'config.get' looks at various sources to find a value above configuration (josn, env variable, commnad line arg, etc.)

// The 'process' object is global in Node and it gives access to the current process
// 'process' has a property called 'env' which gives us environment variables. A standard onne is 'NODE_ENV'
console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // if not set will return 'undefined'
console.log(`app: ${app.get("env")}`); // 'app.get' can be used to get various settings about this application - returns 'development' by default

// be default this feature is not enabled in Express
app.use(express.json()); // adding a piece of middleware - used in the request processing pipeline
// reads the request and if there is a JSON object in body of request it will parse the body of the request into a JSON object,
// then it will set the 'req.body' property

app.use(express.urlencoded({ extended: true })); // key=value&key=value (more of a traditional approach - HTML form with input fields)
app.use(express.static("public")); // put all static files in folder we set "public", then we can serve static content

app.use(helmet());

if (app.get("env") === "development") {
  // if (process.env.NODE_ENV === "development") { // whichever we use is our preference
  app.use(morgan("tiny")); // option for minimal output (e.g. POST /api/courses 200 33 - 5.182 ms)
  startupDebugger("Morgan enabled..."); // will only show on 'development' environment
  // replaced 'console.log()' with "startupDebugger()"
}

// DB work...

dbDebugger("Connected to the Database..."); // separation of concerns

// more middleware functions that called in sequence
// app.use(function (req, res, next) {}); // custom middleware functions should be put in a separate module like below
app.use(customMiddleware.logger);
app.use(customMiddleware.authenticater);

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
