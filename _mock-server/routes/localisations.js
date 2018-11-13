var express = require('express');
var router = express.Router();
var _ = require('lodash');
var sqlite3 = require('sqlite3').verbose()
const Promise = require('bluebird')

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
  let db = new sqlite3.Database('./myBdd.db3')
  db.all("SELECT localisation.*, t.name as typeName, t.description as typeDescription, t.id as typeId, group_concat(st.name) as sousTypes from localisation " +
    "INNER JOIN localisations_types lt ON localisation.id = lt.id_localisation " +
    "INNER JOIN type t ON lt.id_type = t.id " +
    "INNER JOIN sous_type st ON t.id = st.id_type GROUP BY t.id", function(err, row){

    let resultWithArraySousType = row.map(r => {
      r.sousType = r.sousTypes.split(",");
      r.id = r.id.toString();
      delete r.sousTypes;
      return r;
    });
    let result = [];
    let resultGroupById = _.groupBy(resultWithArraySousType, function (loca) { return loca.id});
    _.forEach(resultGroupById, function(value) {
      let localisation = {};
      localisation.id = value[0].id;
      localisation.name = value[0].name;
      localisation.city = value[0].city;
      localisation.description = value[0].description;
      localisation.types = [];
      _.forEach(value, function(v) {
        let type = {};
        type.name = v.typeName;
        type.description = v.typeDescription;
        type.id = v.typeId;
        type.sousType = [];
        type.sousType.push(...v.sousType);
        localisation.types.push(type);
      });
      result.push(localisation);
    });


    res.status(200).json(result);
  });
});

router.post('/', function(req, res) {
  var localisation = req.body;
  localisation.id = (localisations.length + 1).toString();
  localisations.push(localisation);
  res.status(200).json(localisation);
});

router.post('/:id', function(req, res) {
  let localisation = _.find(localisations, function(localisation) { return localisation.id === req.params.id});
  localisation = req.body;
  res.status(200).json(localisation);
});


module.exports = router;
