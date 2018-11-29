var express = require('express');
var router = express.Router();
const billsService = require('./bills.service');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  billsService.getAll(function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(rows)
  });
});

router.get('/:id', function(req, res) {
  billsService.get(req.params.id, function (err, rows) {
    if (err) {
      res.status(500).send(err.toLocaleString())
      return err;
    }
    res.json(rows)
  });
});

router.post('/', function(req, res) {
  billsService.save(req.body, function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(rows)
  });
});

router.post('/:id', function(req, res) {
  billsService.update(req.body, function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(rows)
  });
});

router.delete('/:id', function(req, res) {
  billsService.delete(req.params.id, function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(req.params.id)
  });
});

module.exports = router;
