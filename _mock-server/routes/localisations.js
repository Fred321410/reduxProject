var express = require('express');
var router = express.Router();
var _ = require('lodash');
const localisationsService = require('./localisations.service');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

let localisations = [
  {id: '1', name: 'Carrefour city', description: 'Au coin de la rue', city: 'Nantes', tag: [], types: [
    {id: '1', name: 'NOURITURE', sousType: ['LIVRAISON', 'RESTAURANT', 'SUPERMARCHE'], description: 'Example de type nouriture'}
    ]},
  {id: '2', name: 'Uber Eats', description: 'Livraison domicile', city: 'Nantes', tag: [], types: [
      {id: '1', name: 'NOURITURE', sousType: ['LIVRAISON', 'RESTAURANT', 'SUPERMARCHE'], description: 'Example de type nouriture'}
    ]},
  {id: '3', name: 'Domicile', description: 'Appartement Nantes', city: 'Nantes', tag: [], types: [
      {id: '2', name: 'IMMOBILIER', sousType: ['EAU'], description: 'Example de type immobilier'}
    ]}
];

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
