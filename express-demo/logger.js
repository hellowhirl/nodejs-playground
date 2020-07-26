function logger(req, res, next) {
  console.log("Logging request..."); // if we don't pass control then our request will end up 'hanging'
  next(); // pass control to next middleware function in the pipeline
}

function authenticater(req, res, next) {
  console.log("Authenticating request..."); // if we don't pass control then our request will end up 'hanging'
  next(); // pass control to next middleware function in the pipeline
}

module.exports = { logger, authenticater };
