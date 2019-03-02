//to run in command prompt run node server.js to test the server
//app.js is where the routing for the api is done and connection to all endpoints
//the node.js server is running on port 3000
//and with http.createServer(app) all requests are sent to app.js
//they are processed in app.js 
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000; //process.env for accessing node.js environment variables

const server = http.createServer(app);

//listen on the port number specified
server.listen(port);
