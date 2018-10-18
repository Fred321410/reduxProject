var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

let prelevementTypes = [
  'CB', 'Paiement en ligne', 'Abonnement', 'Liquide', 'Virement', 'Ticket Resto'
];
// define the home page route
router.get('/', function(req, res) {
  res.status(200).json(prelevementTypes);
});

router.post('/', function(req, res) {
  var prelevementType = req.body;
  prelevementType.id = prelevementTypes.length + 1;
  prelevementTypes.push(prelevementType);
  res.status(200).json(prelevementType);
});


module.exports = router;
