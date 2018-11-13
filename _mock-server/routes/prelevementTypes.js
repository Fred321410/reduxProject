var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  var db = new sqlite3.Database('./myBdd.db3')
  db.all("SELECT name FROM prelevement_type", function(err, row){
    res.status(200).json(row.map(r => r.name));
  });
});

module.exports = router;
