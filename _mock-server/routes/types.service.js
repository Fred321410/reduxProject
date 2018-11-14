const service = module.exports = {}

var _ = require('lodash');
const step = require('step')
var sqlite3 = require('sqlite3').verbose()
const Promise = require('bluebird')

// define the home page route
service.getAll = function(cb) {
  step(function () {
    var db = new sqlite3.Database('./myBdd.db3')
    db.all("select type.*, group_concat(st.name) as sousTypes from type\n" +
      "inner join sous_type st ON type.id = st.id_type\n" +
      "GROUP BY type.id", function(err, row){
      const results = row.map(r => {
        r.sousType = r.sousTypes.split(",");
        r.id = r.id.toString();
        delete r.sousTypes;
        return r;
      });
      cb(null, results)
    });
  })
};

service.get = function(id, cb) {
  step(function () {
    var db = new sqlite3.Database('./myBdd.db3')
    db.all("select type.*, group_concat(st.name) as sousTypes from type\n" +
      "inner join sous_type st ON type.id = st.id_type\n" +
      "WHERE type.id = " + id + "\n" +
      "GROUP BY type.id", function(err, row){
      const results = row.map(r => {
        r.sousType = r.sousTypes.split(",");
        r.id = r.id.toString();
        delete r.sousTypes;
        return r;
      });
      cb(null, results[0])
    });
  })
};

