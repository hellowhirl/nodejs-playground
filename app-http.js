const http = require("http");

// here we are able to work with actual request or response objects, like url
const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.write("Hello World");
    response.end();
  }

  if (request.url === "/api/courses") {
    response.write(JSON.stringify([1, 2, 3]));
    response.end();
  }
}); // this 'server' object is an event emitter

// low lever operation we won't be using in real world
// server.on("connection", (socket) => {
//   console.log("new connection");
// });

server.listen(3000);

console.log("Listening on port 3000...");
