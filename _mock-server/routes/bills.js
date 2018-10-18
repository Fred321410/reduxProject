var express = require('express');
var router = express.Router();
var moment = require('moment');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

let bills = [
  {id: '1',
    description: 'Facture EDF',
    amount: 155,
    date: '2018-10-10T22:00:00.000Z',
    localisation: {id: '3', name: 'Domicile', description: 'Appartement Nantes', city: 'Nantes', tag: [], types: [
        {id: '2', name: 'IMMOBILIER', sousType: ['EAU'], description: 'Example de type immobilier'}
      ]},
    types: ['EAU'],
    isDebit: false,
  prelevementType: 'Abonnement'},
  {id: '2',
    description: 'CB Carrefour',
    amount: 25,
    date: '2018-10-11T22:00:00.000Z',
    localisation: {id: '1', name: 'Carrefour city', description: 'Au coin de la rue', city: 'Nantes', tag: [], types: [
        {id: '1', name: 'NOURITURE', sousType: ['LIVRAISON', 'RESTAURANT', 'SUPERMARCHE'], description: 'Example de type nouriture'}
      ]},
  types: ['SUPERMARCHE'],
    isDebit: true,
  prelevementType: 'CB'}
];
// define the home page route
router.get('/', function(req, res) {
  res.status(200).json(bills);
});

router.post('/', function(req, res) {
  console.log(req.body.date)
  var bill = req.body;
  bill.id = (bills.length + 1).toString();
  bills.push(bill);
  res.status(200).json(bill);
});

module.exports = router;
