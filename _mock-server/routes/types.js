var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

let types = [
  {id: 1, name: 'NOURITURE', sousType: []},
  {id: 1, name: 'IMMOBILIER', sousType: ['EAU']}
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


module.exports = router;