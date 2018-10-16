var express = require('express');
var router = express.Router();
var _ = require('lodash');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

let localisations = [
  {id: '1', name: 'Carrefour city', description: 'Au coin de la rue', city: 'Nantes', tag: [], types: [
    {id: '1', name: 'NOURITURE', sousType: ['EXAMPLE'], description: 'Example de type nouriture'}
    ]}
];
// define the home page route
router.get('/', function(req, res) {
  res.status(200).json(localisations);
});

router.post('/', function(req, res) {
  var localisation = req.body;
  localisation.id = (localisations.length + 1).toString();
  localisations.push(localisation);
  res.status(200).json(localisation);
});

router.post('/:id', function(req, res) {
  let localisation = _.find(localisations, function(localisation) { return localisation.id === req.params.id});
  localisation = req.body;
  res.status(200).json(localisation);
});


module.exports = router;
