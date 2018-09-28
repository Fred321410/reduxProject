var express = require('express');
var router = express.Router();
var _ = require('lodash');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

let types = [
  {id: '1', name: 'NOURITURE', sousType: [], description: 'Example de type nouriture'},
  {id: '2', name: 'IMMOBILIER', sousType: ['EAU'], description: 'Example de type immobilier'}
];
// define the home page route
router.get('/', function(req, res) {
  res.status(200).json(types);
});

router.post('/', function(req, res) {
  var type = req.body;
  type.id = types.length + 1;
  types.push(type);
  res.status(200).json(type);
});

router.post('/:id/sousType', function(req, res) {
  let type = _.find(types, function(type) { return type.id === req.params.id});
  type.sousType.push(req.body.sousType);
  res.status(200).json(type);
});


module.exports = router;
