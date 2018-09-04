var express = require('express');
var router = express.Router();
var moment = require('moment');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

let bills = [
  {id: 1, description: 'Facture EDF', amount: 155, date: '13/07/2018'},
  {id: 2, description: 'CB Carrefour', amount: -25, date: '14/07/2018'}
];
// define the home page route
router.get('/', function(req, res) {
  res.status(200).json(bills);
});

router.post('/', function(req, res) {
  var bill = req.body;
  bill.id = bills.length + 1;
  bill.date = moment(bill.date).format('DD/MM/YYYY');
  bills.push(bill);
  res.status(200).json(bill);
});

module.exports = router;
