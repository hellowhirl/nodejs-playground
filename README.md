# NodeJS Notes

## Overview

### About NodeJS

- a runtime environment for executing JavaScript code
- Ideal for building highly-scalable, data-intensive and real-time applications
- Superfast and highly scalable
  - companies build backends with less code
  - increase number of requests served per second
  - faster response time
  - great for prototyping and agile development
- JavaScript everywhere (reuse JS skills)
- Cleaner and more consistent code with JavaScript
- Large ecosystem of open-source libs

### Architecture of Node

- Ryan Dahl, embedded Chrome v8 engine in a C++ program and called it Node
- There is no 'document' object or 'window' object; however, comes with objects like `fs` for file system, `http` for listening for requests, and `network`
  - these extra capabilities are not available inside browsers
- "I prefer Node to C#" is fundamentally wrong - Node is NOT a programming language
  - it's a runtime environment for executing JavaScript code

### How Node works

- Asynchronous: non-blocking architecture (Node by default)
- Synchronous: blocking architecture (how ASP(dot)net and Rails work out of the box)
- In Node we have a single thread to handle all requests - will move on from one client to the next without waiting for response from DB
- When the DB prepares the result it puts the message in an `Event Queue`
  - Node continually monitors this queue in the backgground, when it finds an event in this queue it will take it out and process it
- Node is ideal for I/O-intensive apps (a lot of disk or network access) - able to serve more clients without need for more hardware
- Do not use Node for CPU-intensive apps (video encoding or image manipulation)
- We can write regular JavaScript, just like how we write for browsers

Example:

```
$ node test-app.js
```

Module Wrapper Function:

- Node does not execute our code directly - it always wraps the code in each module with an IIFE function like below to create scope:

  ```js
  (function (exports, require, module, pathAndfilename, dirname) {
    //<code inside module>
  });
  ```

- `require` appears to be globally but actually it's not - it's local to each module
  - it is one of the arguments we pass to the Module Wrapper Function that wraps our module

## Node Module System:

- Built-in modules in Node:
  - OS, File System, events, HTTP, Path, Process, Query Strings, Stream, etc.
- To work with files and directories in Node first we need to `require` the `fs` module and then use the File System Module method(s)
  - always prefer to use asynchronous methods

### Events

- a lot of Node's core functionality is based on events (`EventEmitter` a core class - a lot of other classes are based on EventEmitter)
- an `event` is a signal that incdicates that something has happened in our application
- `emit` means making a noise (signaling something has happened)
- Example: listening for requests from an HTTP class on a given port, everytime we receive a request from that port that HTTP class raises an event
  - our job is to respond that event which involves reading that request and returning the right response
- whenever we want to raise events in our application to signal that something has happened, we need to create a Class that extends EventEmitter.
  - We can also add additional functionality (like a 'log' method). Then whenever we want to raise an event we use `this.emit` because it references the class being used, which is an extension of EventEmitter.
- Then, in a separate module (like 'app.js') we will use an instance of the custom class we have defined that extends EventEmitter.
  - We can then use the `.on` method which will register an event listener.

In summary: to create a class with the ability to raise events, we should extend EventEmitter:

```js
class Logger extends EventEmitter {}
```

### Http Module

- used for creating networking applications
- Several built-in classes in Node derive from EventEmitter like `net.Server` (which http.Server inherits from)
- we use the Express framework to handle various routes, which givves our application a clean structure.
- Internally Epxress is built on top of the http module in Node

## Node Package Manager (NPM)

- for pretty much any kind of functionality there is most likely a free open source library available on NPM
- when you install node you also get npm

### package.json

- a bunch of metadata about your application (key/value pairs)
- best practice: whenever you start a node project you want to create a 'package.json'

```
$ npm init
```

- answer all prompts with defaults

```
$ npm init --yes
```

- whenever we install a new package via npm it is inserted into `package.json` under `dependencies`
  - every node module has this file, just like our application
- also we can see the name of this dev dependency under `node_modules` folder
- in later versions of npm we don't need to supply the --save flag anymore, just use:

```
$ npm i library-name
```

this command looks at our package.json and downloads our dependencies from npm registry

```
$ npm i
```

- `package-lock.json` is created by npm when we installed an npm package (don't worry about this file, it's just for npm to do its job)
- when we install an npm package we may get other libraries that it is dependent on as well
- dependencies of one library used to be stored inside their own node_modules folder (but this was a mess and didn't work for windows machines)
- now ALL dependencies are stored under node_modules\*
  - \*Exception: if our dependency pacakges have a dependency that is different than others then it will be stored within the module's own 'node_modules'

### Semantic Versioning

```
"4.13.6" (1st, 2nd, 3rd) numbers
```

1. major version: if adding a new feature that could potentially break the current version of mongooge, then the major version increases
2. minor version: adding new features that don't break the API
3. patch version: after fixing a bug and re-releasing, the number goes up

- `-^`: as long as the major version is 4, we are interested in any version
- `4.x`: equal to ^4.13.6
- `~1.8.3`: as long as major and minor version are these numbers
- `1.8.x`: same as ~1.8.3

See the version of all the packages (and their dependencies) installed in a tree graph

```
$ npm list
```

See only depenedencies of our application

```
$ npm list --depth=0
```

### Viewing registry info for a package

We can either use npm pages or below commands to view registry info:

```
$ npm view mongoose
```

View only values of dependencies property:

```
$ npm view mongooge dependencies
```

View all the versions of a package released so far:

```
$ npm view mongoose versions
```

Installing a Specific Version of a Package

```
$ npm i mongoose@2.4.2
```

Find out what pacakges have been outdated and which are the new versions, produces below table:

```
$ npm outdated
```

| Package    | Current | Wanted | Latest | Location          | my explanation comment                                                                       |
| :--------- | :-----: | -----: | ------ | ----------------- | -------------------------------------------------------------------------------------------- |
| mongoose   | 5.9.14  | 5.9.18 | 5.9.18 | nodejs_playground | If Latest is higher number then we can still use latest release for specificed major release |
| underscore |  1.4.0  | 1.10.2 | 1.10.2 | nodejs playground | Latest release for "5.x" is "5.9.18"                                                         |

For updating minor and patch releases only

```
$ npm update
```

Tool for checking latest dependency major version: npm-check-updates

```
$ npm-check-updates
```

To update to latest major version

```
$ npm-check-updates -u
-OR-
$ ncu -u
```

This will only update package.json. We still have to install dependencies after with:

```
$ npm i
```

### DevDependencies

- sometimes we only use a dependency for development purposes
  - these dependencies should not go into the prod environment. Insteadd we should use `--save-dev`

JS Hint is a static analysis tool for JavaScript code - looks for potential problems or syntactical errors

```
$ npm i jshint --save-dev
```

- all dependencies are stored under npm_modules; they are only segregated in package.json

### Working with Global Packages

Npm is a global tool that is not specific to any given project. To install a specific version globally:

```
$ npm i -g npm@5.1.2
```

to update npm to latest version:

```
$ npm i -g npm
```

npm commands work globally as well like:

```
$ npm -g outdated
```

### Steps for publishing a package on npm

1. create a project wihh a unique 'name' in package.json (e.g. "lion-lib-random123):

```
$ npm init --yes
```

2. add an entry point file, 'index.js'
3. 'export' some funciions
4. login to npm (first create an account)

```
$ npm login
```

5. publish package

```
$ npm publish
```

6. now we can use in another node application

```
$ npm init --yes
$ npm i lion-lib-random123
```

7. find indside 'node_modules'
8. import the module in the code

```js
var lion = require("lion-lib-random123");
var result = lion.add(1, 2);
console.log(result);
```

### Updating a Published Pacakage

Publish a new version of npm package after, depending on work that was done (eg. adding a new feature)

```
$ npm version major
$ npm version minor
$ npm version patch
```

Then we can publish:

```
$ npm publish
```

### Other useful NPM commands

Install a package as a development dependency

```
$ npm i <packageName> --save-dev
```

Uninstall a package

```
$ npm uninstall <packageName> -OR- $ npm un <packageName>
```

Building RESTful API's using Express

Client <-----------> Server
(communication via HTTP)

Server: exposes services that are accessible via HTTProtocol
Rest: a convention for building HTTP services (CRUD: Create, Read, Update, Delete )

RESTful Services

https://vidly.com/api/customers

- address can start with "http" or "https", but "https" is more secure
- vidly.com: domain
- /api: convention to expose RESTful services
- /customers: collection of customers in our application (a resource)

common HTTP methods:

C
POST /api/customers, { name: '' } - we should include customer object in body of request

R
GET /api/customers
GET /api/customers/id

U
PUT /api/customers/id, { name: '' } - we should include customer object in body of request

D
DELETE /api/customers/1d

Express: most popular framework for building web applications and web servers on top of node

- define new routes by calling 'app.get()'
- with this structure, as our applicatino grows we can move routes to different files (ex. courses.js)
- Express gives our application a skeleton (a structure)

Nodemon: Node Monitor, will watch all files for changes
$ npm i -g nodemon
Run below to watch files:
$ nodemon index.js

Environment Variable: a variable that is part of the environment in which a process runs

For Mac set environment variable from the command line:
$ export PORT=5000

- Route paramters are used for required values
  http://localhost:3000/api/posts/2018/1
  {
  year: "2018",
  month: "3"
  }

- Whereas query string paramters are optional; they provide additional data to our backend services
  http://localhost:5000/api/posts/2018/3?sortBy=name
  {
  sortBy: "name"
  }

- Route Parameters & Query parameters are stored in an object with key value pairs

- We can test HTTP services using Postman
  http://localhost:3000/api/courses
  {
  "name": "new course"
  }
- As a security best practice we should never ever trust what the client sends us, we should always validate the input

Express - Middleware

- middleware function: a function that takes a request object and either returns a response to the client (thereby terminating the request/response cycle), or passes control to another middleware function.
- in Express tecnically every route handler function is a middleware function
- Examples: json(), aRouteHandler()

::: Request processing pipeline :::

Request -> middleware function(s)\* => Response

\*middleware function(s) pass control to next middleware function with 'next()'

:::::::::::::::::::::::::::::::::::

we can perform cross-cutting concerns (logging, authentication, authorization, etc.)

- an Express application is essentially nothing but a bunch of middleware functions
- middleware functions are called in sequence
- to laod a middlware function we call 'app.use()'

Third-Party Middleware - only use if you need it, because it will impact our request processing pipeline

- helmet: best practice for securing that helps secure apps by setting various HTTP headers.
- morgan: used to log http request every time we send a request to the server - can also be configured to write to a log file

Express - Configuration
Express - Debugging
Express - Templating Engines

- When using environment variabesl we can work with 'process.env.NODE_ENV' or 'app.get("env")'
- Setting environment variable from the terminal

  $ export NODE_ENV=production

- we can see all our environment variables with:

  console.log(process.env)

Configuration

- We can store configuration settings for our application with below package
  $ npm i config
- Should not store application secrets (passwords) in these config files
- Instead we should store in Environment Variables

  - Manually set environment variables from the command line and then read them using our config module

- Make sure this is spelled properly "custom-environment-variables.json" - goes in our config folder
  - In this file we define the mapping of configuration settings to environment variables

Debugging - a better way

- Instead of 'console.log()' it is better to use the 'debug' package in Node
- Control these log messages (enable or disable) from the outside using an environment variable
- We can also determine the level of debugging information we want to see (for example only database logs)
- Set an environment variable:
  $ export DEBUG=app:startup
- When we don't want to see any debugging info we can reset environment variable:
  $ export DEBUG=
- to see debugging messages from multiple namespaces
  $ export DEBUG=app:startup,app:db
  $ export DEBUG=app:\*
- we can also set the environment variable at time of running our application and run appication at the same time (shortcut)
  $ DEBUG=app:db nodemon index.js
- we can rename variable for "startupDebugger" to just "debug" if we are only testing for the application startup
