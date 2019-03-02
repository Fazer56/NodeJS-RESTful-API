//routes for the orders


const express = require('express');
//sub package that express ships with that gives capabilities for handling different routes
//with different http words
const router = express.Router();

//for mogooDB
const Order = require('../models/order');
const mongoose = require('mongoose');
//handles all get requests of the endpoint. first arguments is the route next argument is the handler
//use slash because the file is already called orders. In he app.js orderRoutes targets './api/routes/orders'
router.get('/',(req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /orders'
  });
});

//post the order to the MongoDB Atlas database
router.post('/',(req, res, next) => {
  //Instance of the Order model pass data in the constuctor
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    driverName: req.body.driverName,
    location: req.body.location,
    date: req.body.date,
    deliveryTime: req.body.deliveryTime,
    orderedCreatedBy: req.body.orderedCreatedBy,
    props: req.body.props,
    description: req.body.description,
    eventContact: req.body.eventContact,
    telNumber:req.body.telNumber
  });
  //saves the order to the database
  order.save()
  .then(result => {
    console.log(result);
  })
  .catch(err => console.log(err));
  res.status(201).json({
    message: 'Order created',
    order: order
  });
});

//get info about a single order. the parameter passed in the get request is the ID of
//the order.
router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
    .exec()
    .then(doc => {
      console.log("from Database",doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      //error for failed fetching data.
      res.status(500).json(err);
    });
    //paremeter always has to be in quotation marks.
    /*if(id === 'special'){
      res.status(200).json({
        message: 'You discovered the special ID',
        id: id
      });
    }//endif
    else if(id === '20'){
      res.status(200).json({
        message: 'You are a slick dude',
        id: id
      });
    }*
    else {
      res.status(200).json({
        message: 'You passed an ID'
      });
    }*/
});

//to update the order
router.patch('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated order!',
    orderId: req.params.orderId
  });
});

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: 'Order Deleted!',
    orderId: req.params.orderId
  });
});


//export the router created to handle the requst routing.
module.exports = router;
