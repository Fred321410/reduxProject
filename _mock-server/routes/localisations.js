var express = require('express');
var router = express.Router();
var _ = require('lodash');
const localisationsService = require('./localisations.service');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  localisationsService.getAll(function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(rows)
  });
});

router.get('/:id', function(req, res) {
  localisationsService.get(req.params.id, function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(rows)
  });
});

router.post('/', function(req, res) {
  localisationsService.save(req.body, function (err, rows) {
    if (err) {
      console.log(err);
      res.status(500).send(err)
      return err;
    }
    res.json(rows)
  });
});

router.post('/:id', function(req, res) {
  res.status(500).send('TODO')
});


module.exports = router;
