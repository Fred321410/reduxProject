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
    db.all("SELECT bill.*, group_concat(DISTINCT(st.name)) as types from bill " +
      "INNER JOIN bill_sousTypes bst ON bst.id_bill = bill.id " +
      "INNER JOIN sous_type st ON st.id = bst.id_sous_type GROUP BY bill.id", this);
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    } else if (results.filter(function(bill) {return bill.id !== null}).length === 0) {
      cb(null, [])
      return
    }
    bills = results.map(r => {
      r.types = r.types.split(",");
      r.isDebit = r.isDebit === 1;
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
      "INNER JOIN sous_type st ON st.id = bst.id_sous_type WHERE bill.id = " + id + " GROUP BY bill.id", this);
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    } else if (results.filter(function(bill) {return bill.id !== null}).length === 0) {
      cb(null, [])
      return
    }
    bill = results.map(r => {
      r.types = r.types.split(",");
      r.isDebit = r.isDebit === 1;
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
    db.run(`INSERT INTO bill_sousTypes (id_bill, id_sous_type, id_type) `
      + `VALUES (`+ idBill +`, (select sous_type.id from sous_type INNER JOIN type t ON sous_type.id_type = t.id `
      + `where t.id = ` + idType + ` and sous_type.name = \'` + sous_type + `\' limit 1), ` + idType +`)`, function (err) {
      if (err) {
        cb(err.message, null)
      }
      cb(null, null)
    })
  });
};

service.update = function(bill, cb) {
  let finalResult = {}
  step(function () {
    service.updateBill(bill, this)
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    service.deleteSousType(parseInt(bill.id), this);
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    let group = this.group();
    bill.localisation.types.forEach(function (type) {
      type.sousType.forEach(function (st){
        if (bill.types.includes(st)) {
          service.saveSousType(parseInt(bill.id), parseInt(type.id), st, group());
        }
      });
    });
  }, function (err, results) {
    if (err) {
      console.error(err)
      cb(err, null)
      return
    }
    cb(null, bill)
  });
};

service.updateBill = function(bill, cb) {
  step(function () {
    let db = new sqlite3.Database('./myBdd.db3');
    db.run(`UPDATE bill SET date = ?, amount = ?, localisation = ?, description = ?, isDebit = ?, prelevementType = ?, couvertureFrom = ?, couvertureTo = ? WHERE id = ?`,
      [bill.date, bill.amount, parseInt(bill.localisation.id), bill.description, bill.isDebit, bill.prelevementType, bill.couvertureFrom, bill.couvertureTo, parseInt(bill.id)], function (err) {
      if (err) {
        cb(err.message, null)
      }
      cb(null, bill)
    })
  });
};

service.delete = function(id, cb) {
  step(function () {
    service.get(id, this);
  }, function (err, results) {
    if (err) {
      cb(err, null)
    } else if (!results || results.length === 0) {
      cb('Cette facture n\'existe pas', null)
      return
    }
    service.deleteSousType(id, this);
  }, function (err, results) {
    if (err) {
      cb(err, null)
      return
    }
    var db = new sqlite3.Database('./myBdd.db3');
    db.run("DELETE FROM bill WHERE id = ?", [id], function(err, row){
      if (err) {
        cb(err.message, null)
      }
      cb(null, row)
    })
    db.close();
  });
};

service.deleteSousType = function(id, cb) {
  step(function () {
    var db = new sqlite3.Database('./myBdd.db3');
    db.run("DELETE FROM bill_sousTypes WHERE id_bill = ?", [id], function(err, row){
      if (err) {
        cb(err.message, null)
      }
      cb(null, row)
    })
    db.close();
  });
};
