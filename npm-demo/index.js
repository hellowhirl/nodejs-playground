var _ = require("underscore"); //

// How the 'require' function resolves a module (order 1 to 3)
// 1) Core module
// 2) File or folder: in this case node assumes there will be underscore/index.js
// 3) node_modules: if none of above then it looks for that module inside 'node_modules'

var result = _.contains([1, 2, 3], 3);
console.log(result); // result will b e boolean: "true"
