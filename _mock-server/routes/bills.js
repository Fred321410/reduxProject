var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.status(200).json([{id: 1, description: 'Facture EDF', amount: 155, date: '2018-07-13'}, {id: 2, description: 'CB Carrefour', amount: -25, date: '2018-07-14'}]);
});

module.exports = router;
