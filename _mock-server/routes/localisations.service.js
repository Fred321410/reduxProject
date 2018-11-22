const service = module.exports = {}

const step = require('step')
var sqlite3 = require('sqlite3').verbose()
const typesService = require('./types.service');

// define the home page route
service.getAll = function(cb) {
  let localisations = [];
  step(function () {
    var db = new sqlite3.Database('./myBdd.db3')
    db.all("SELECT localisation.*, group_concat(t.id) as types from localisation " +
      "INNER JOIN localisations_types lt ON localisation.id = lt.id_localisation " +
      "INNER JOIN type t ON lt.id_type = t.id GROUP BY localisation.id", this);
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    localisations = results.map(r => {
      r.typesId = r.types.split(",");
      r.id = r.id.toString();
      delete r.types;
      return r;
    });
    let group = this.group();
    localisations.forEach(function (localisation) {
      localisation.typesId.forEach(function (type) {
        typesService.get(type, group());
      });
    });
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    localisations.forEach(function (localisation) {
      localisation.types = [];
      localisation.typesId.forEach(function (typeId) {
        localisation.types.push(results.find(function (type) {return type.id === typeId}));
      });
      delete localisation.typesId;
    });
    cb(null, localisations)
  });
};

service.get = function(id, cb) {
  let localisation = {};
  step(function () {
    var db = new sqlite3.Database('./myBdd.db3')
    db.all("SELECT localisation.*, group_concat(t.id) as types from localisation " +
      "INNER JOIN localisations_types lt ON localisation.id = lt.id_localisation " +
      "INNER JOIN type t ON lt.id_type = t.id " +
      "WHERE localisation.id = " + id +
      " GROUP BY localisation.id", this);
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    localisation = results.map(r => {
      r.typesId = r.types.split(",");
      r.id = r.id.toString();
      delete r.types;
      return r;
    })[0];
    let group = this.group();
    localisation.typesId.forEach(function (type) {
      typesService.get(type, group());
    });
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    localisation.types = [];
    localisation.typesId.forEach(function (typeId) {
      localisation.types.push(results.find(function (type) {return type.id === typeId}));
    });
    delete localisation.typesId;
    cb(null, localisation)
  });
};

service.save = function(localisation, cb) {
  let finalResult = {}
  step(function () {
    service.saveLocalisation(localisation, this)
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    finalResult = results;
    let group = this.group();
    localisation.types.forEach(function (type) {
      service.saveType(finalResult.id, type.id, group());
    });
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    finalResult.id = finalResult.id.toString();
    cb(null, finalResult)
  });
};

service.saveLocalisation = function(localisation, cb) {
  step(function () {
    let db = new sqlite3.Database('./myBdd.db3');
    db.run(`INSERT INTO localisation (name, description, city)
          VALUES(?, ?, ?)`, [localisation.name, localisation.description, localisation.city], function (err) {
      if (err) {
        cb(err.message, null)
      }
      localisation.id = this.lastID;
      cb(null, localisation)
    })
  });
};


service.saveType = function(id_localisation, id_type, cb) {
  step(function () {
    let db = new sqlite3.Database('./myBdd.db3');
    db.run(`INSERT INTO localisations_types (id_type, id_localisation)
          VALUES(?, ?)`, [id_type, id_localisation], function (err) {
      if (err) {
        cb(err.message, null)
      }
      cb(null, null)
    })
  });
};
