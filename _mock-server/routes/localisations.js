var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

let localisations = [
  {id: 1, description: 'Carrefour city', city: 'Nantes', tag: [], type: ['ALIMENTATION', 'SUPERMARCHE']}
];
// define the home page route
router.get('/', function(req, res) {
  res.status(200).json(localisations);
});


module.exports = router;
