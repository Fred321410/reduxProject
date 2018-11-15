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
      if (err) {
        cb(err.message, null)
      }
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
      if (err) {
        cb(err.message, null)
      }
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


service.save = function(type, cb) {
  step(function () {
    var db = new sqlite3.Database('./myBdd.db3');
    db.run(`INSERT INTO type(name, description) VALUES(?, ?)`, [type.name, type.description], function(err) {
      if (err) {
        cb(err.message, null)
      }
      type.id = this.lastID;
      type.id = type.id.toString()
      cb(null, type)
    });
    db.close();
  })
};

service.addSousType = function(idType, sousType, cb) {
  step(function () {
    service.get(idType, this);
  }, function (err, results) {
    console.log(results)
    if (err) {
      cb(err, null)
    } else if (!results || results.length === 0) {
      cb('Ce type n\'existe pas', null)
    }
    const type = results;
    var db = new sqlite3.Database('./myBdd.db3');
    db.run(`INSERT INTO sous_type(name, id_type)
          VALUES(?, ?)`, [sousType, idType], function (err) {
      if (err) {
        cb(err.message, null)
      }
      type.sousType.push(sousType)
      cb(null, type)
    })
    db.close();
  });
};

service.deleteSousType = function(idType, sousType, cb) {
  step(function () {
    service.get(idType, this);
  }, function (err, results) {
    if (err) {
      cb(err, null)
    } else if (!results || results.length === 0) {
      cb('Ce type n\'existe pas', null)
    }
    var db = new sqlite3.Database('./myBdd.db3');
    db.run("DELETE FROM sous_type WHERE id_type = ? AND name = ?", [idType, sousType], function(err, row){
      if (err) {
        cb(err.message, null)
      }
      cb(null, row)
    })
    db.close();
  });
};

