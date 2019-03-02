/*********May need to change IP whitelist on mongoDB atlas server for
access to DATABASE*/

//**installed 'npm install --save-dev nodemon' to stop the need for restarting the server
//every time there is a change to the api.
//**added package morgan to 'npm install --save morgan' for logging api activity
//**added package body-parser to parse the body of requests making it easier to read and use the data
// used for json data and url encoded bodies
//installed body-parser for parsing json data

//cors Cross-Origin-Resource Sharing security concept
//default browser will stop the client getting resources different servers
//this is overcome by using the right headers in requests

//express has a lot of functionality
const express = require('express');
const app = express();
//morgan package is used for logging api activity
//funnel all requests through morgan middleware which logs activity
//calls the 'next' function in (res, req, next).
//each request is logged and can be seen as the server is running in the command line
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes to the different endpoints for handling requests
const orderRoutes = require('./api/routes/orders');
const caravanRoutes = require('./api/routes/caravans');

//connect to MongoDB Atlas
//use the environment variable set in nodemon.js for the password
mongoose.connect(
  'mongodb://faoilean:'+ process.env.MONGO_ATLAS_PW +'@node-rest-event-shard-00-00-wotrh.mongodb.net:27017,node-rest-event-shard-00-01-wotrh.mongodb.net:27017,node-rest-event-shard-00-02-wotrh.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-event-shard-0&authSource=admin&retryWrites=true',
  {
      useNewUrlParser: true
  }
);

//***
//when requests are sent the first place
//they will be sent is here. morgan will log the requests
//requests will continue to be sent down app.use() until
//the right request is found.
//ie a request for caravans will be sent to the path('./api/routes/caravans')
//**
//app.use() for funneling requests
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
//extracts json data and makes it easily readable
app.use(bodyParser.json());

//prevent cors errors.
app.use((req, res, next) => {
  //this will allow the api to connect with any client.
  //Access-control will be allowed to any client
  //it is possible to restrict access to the api by adding a patameter to "*" that is the url of our website
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    'Access-Control-Allow-Headears',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  //browsers checks if the reqiest can be made
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  //for the other requests to run after.
  next();
});
//for serving static files ie accessing the
//front end "index.js"
//request come in for any static files are
//processed by express.static()
//and sent to the 'public' folder
//this is where static files are kept
app.use(express.static('public'));

//app.use((req, res, next) )
//Routes which should handle requests
//only requests that start with orders will then be handled by orderRoutes
//this next line tells app which endpoint to go to.
app.use('/orders', orderRoutes);
app.use('/caravans', caravanRoutes);

//error handling for any Route that doesn't reach an endpoint that can handle it's requests
//if the request isnt for a caravan or an order
app.use((req, res, next) => {
  //Error object provided by node.js can be used with status codes
  const error = new Error('Not found');
  error.status = 404;
  //forwards the above error('Not found') 404
  next(error);
});

//this will handle above errors of incorrect routes as well as any other errors
// for example errors in database lookups.
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      //any error message passed
      message: error.message
    }
  })
});

module.exports = app;
