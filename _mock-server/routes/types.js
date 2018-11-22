var express = require('express');
var router = express.Router();
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
  typesService.save(req.body, function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(rows)
  });
});

router.post('/:id/sousType', function(req, res) {
  typesService.addSousType(req.params.id, req.body.sousType, function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(rows)
  });
});

router.delete('/:id/sousType/:sousType', function(req, res) {
  typesService.deleteSousType(req.params.id, req.params.sousType, function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(rows)
  });
});


module.exports = router;
