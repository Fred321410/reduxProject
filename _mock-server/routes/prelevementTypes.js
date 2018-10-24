var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()

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

  var db = new sqlite3.Database('./myBdd.db3')
  db.all("SELECT name FROM prelevement_type", function(err, row){
    res.status(200).json(row.map(r => r.name));
  });

});

router.post('/', function(req, res) {
  var prelevementType = req.body;
  prelevementType.id = prelevementTypes.length + 1;
  prelevementTypes.push(prelevementType);
  res.status(200).json(prelevementType);
});


module.exports = router;
