const mongoose = require('mongoose');

//mongoose schema pass a javascript object
//special type for id that mongooose uses
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  driverName: String,
  location: String,
  date: Date,
  deliveryTime: Date,
  orderedCreatedBy: String,
  props: String,
  description: String,
  eventContact: String,
  telNumber: String

});

//export the schema wrapped in the model
//'Order' refers to the model as it is to be called externally
//orderSchema is the model
module.exports = mongoose.model('Order', orderSchema);
