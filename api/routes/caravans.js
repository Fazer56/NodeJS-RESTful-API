//handle caravan requests and responses

const express = require('express');
const router = express.Router();

// using a get request for caravans with  '/' without needing to write '/caravans'
// the route this file is already parsed in /app file.
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Caravans were fetched'
  });
});

router.get('/:caravanId', (req, res, next) => {
  res.status(200).json({
    message: 'Caravan Details',
    orderId: req.params.caravanId
  });
});

//post request that creates a caravan objecrt in json form
//the json is stored inside the request body. "req.body.<NAMErequest> "
//res.status(201) a json resopnse for a successful post request
/*router.post('/', (req, res, next) => {
  const caravan = {
    name: req.body.name,
    price: req.body.price,
    numBeds: req.body.numBeds,
    sleepCapacity: req.body.sleepCapacity
  }
  res.status(201).json({
      message: 'Caravan was created',
      createdCaravan: caravan
  });
});*/

//testing zzzzzzzzzzzzzzzzzzzzzzzzzzzz
router.post('/', (req, res, next) => {
  const caravan = {
    weight: req.body.weight,
    height: req.body.height,
    age: req.body.age,
    activity: req.body.activity
   }

   car = caravan;
   calc = (10*parseFloat(caravan.weight));
   //calc = ((10*parseFloat(caravan.weight))+(6.25*parseFloat(caravan.height))-(5*parseFloat(caravan.age))-5)*parseFloat(caravan.activity);
   strCalc = calc.toString();
  res.status(201).json({
      message: 'Caravan was created',
      createdCaravan: strCalc
  });
});

router.delete('/:caravanId', (req, res, next) => {
  res.status(200).json({
    message: 'Caravan was deleted',
    caravanId: req.params.caravanId
  });
});

router.patch('/:caravanId', (req, res, next) => {
  res.status(200).json({
    message:'Caravan succesfully updated',
    caravanId: req.params.caravanId
  });
});

module.exports = router;
