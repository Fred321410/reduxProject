const service = module.exports = {}

const step = require('step')
var sqlite3 = require('sqlite3').verbose()
const typesService = require('./types.service');
const localisationsService = require('./localisations.service');

// define the home page route
service.getAll = function(cb) {
  let bills = [];
  step(function () {
    var db = new sqlite3.Database('./myBdd.db3')
    db.all("SELECT bill.*, group_concat(st.name) as types from bill " +
      "INNER JOIN bill_sousTypes bst ON bst.id_bill = bill.id " +
      "INNER JOIN sous_type st ON st.id = bst.id_sous_type", this);
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    bills = results.map(r => {
      r.types = r.types.split(",");
      r.id = r.id.toString();
      return r;
    });
    let group = this.group();
    bills.forEach(function (bill) {
      localisationsService.get(bill.localisation, group());
    });
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    bills.forEach(function (bill) {
      bill.localisation = results.find(function (localisation) {return localisation.id === bill.localisation.toString()});
    });
    cb(null, bills)
  });
};

service.get = function(id, cb) {
  let bill = {};
  step(function () {
    var db = new sqlite3.Database('./myBdd.db3')
    db.all("SELECT bill.*, group_concat(st.name) as types from bill " +
      "INNER JOIN bill_sousTypes bst ON bst.id_bill = bill.id " +
      "INNER JOIN sous_type st ON st.id = bst.id_sous_type WHERE bill.id = " + id, this);
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    bill = results.map(r => {
      r.types = r.types.split(",");
      r.id = r.id.toString();
      return r;
    })[0];
    localisationsService.get(bill.localisation, this);
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    bill.localisation = results;
    cb(null, bill)
  });
};

service.save = function(bill, cb) {
  let finalResult = {}
  step(function () {
    service.saveBill(bill, this)
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    finalResult = results;
    let group = this.group();
    bill.localisation.types.forEach(function (type) {
      type.sousType.forEach(function (st){
        if (bill.types.includes(st)) {
          service.saveSousType(bill.id, type.id, st, group());
        }
      });
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

service.saveBill = function(bill, cb) {
  step(function () {
    let db = new sqlite3.Database('./myBdd.db3');
    db.run(`INSERT INTO bill (date, amount, localisation, description, isDebit, prelevementType, couvertureFrom, couvertureTo)
          VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [bill.date, bill.amount, parseInt(bill.localisation.id), bill.description, bill.isDebit, bill.prelevementType, bill.couvertureFrom, bill.couvertureTo], function (err) {
      if (err) {
        cb(err.message, null)
      }
      bill.id = this.lastID;
      cb(null, bill)
    })
  });
};

service.saveSousType = function(idBill, idType, sous_type, cb) {
  step(function () {
    let db = new sqlite3.Database('./myBdd.db3');
    db.run(`INSERT INTO bill_sousTypes (id_bill, id_sous_type) `
      + `VALUES (`+ idBill +`, (select sous_type.id from sous_type INNER JOIN type t ON sous_type.id_type = t.id `
      + `where t.id = ` + idType + ` and sous_type.name = \'` + sous_type + `\' limit 1))`, function (err) {
      if (err) {
        cb(err.message, null)
      }
      cb(null, null)
    })
  });
};
