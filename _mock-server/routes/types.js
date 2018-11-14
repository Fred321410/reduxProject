var express = require('express');
var router = express.Router();
var _ = require('lodash');
var sqlite3 = require('sqlite3').verbose()
const Promise = require('bluebird')
var typesService = require('./types.service')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  typesService.getAll(function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(rows)
  });
});

// define the home page route
router.get('/:id', function(req, res) {
  typesService.get(req.params.id, function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(rows)
  });
});

router.post('/', function(req, res) {
  var db = new sqlite3.Database('./myBdd.db3')
  var type = req.body;
  db.run(`INSERT INTO type(name, description) VALUES(?, ?)`, [type.name, type.description], function(err) {
    if (err) {
      res.status(500).json(err.message);
      return console.log(err.message);
    }
    type.id = this.lastID;
    type.id = type.id.toString()
    res.status(200).json(type);
  });
  db.close();
});

router.post('/:id/sousType', function(req, res) {
  var db = new sqlite3.Database('./myBdd.db3')
  var sousType = req.body.sousType;
  db.serialize(() => {
    // Queries scheduled here will be serialized.
    db.all('SELECT name FROM type WHERE id = ' + req.params.id, function (err, row) {
      if (err) {
        res.status(500).json(err.message);
        return console.log(err.message);
      }
      if (row.length <= 0) {
        res.status(500).json("Ce type n'existe pas");
        return console.log("Ce type n'existe pas");
      }

    }).run(`INSERT INTO sous_type(name, id_type)
          VALUES(?, ?)`, [sousType, req.params.id], function (err) {
      if (err) {
        res.status(500).json(err.message);
        return console.log(err.message);
      }
      var type = req.body.type
      type.sousType.push(sousType)
      res.status(200).json(type);
    });
  });
  db.close();
});

router.delete('/:id/sousType/:sousType', function(req, res) {
  var db = new sqlite3.Database('./myBdd.db3')
  var deleteSousType = new Promise((resolve, reject) => {
    db.all('SELECT name FROM type WHERE id = ' + req.params.id, function (err, row) {
      if (err) {
        res.status(500).json(err.message);
        reject(err)
      } else if (row.length <= 0) {
        res.status(500).json("Ce type n'existe pas");
        reject("Ce type n'existe pas");
      } else {
        resolve(row)
      }
    })
  });
  deleteSousType().then((row) => {
    console.log(row);
  }).catch((err) => {
    console.log('Error: ');
    console.log(JSON.stringify(err));
  });
  db.close();
});


module.exports = router;
