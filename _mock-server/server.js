'use strict';

var express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  path = require('path'),
  bills = require('./routes/bills'),
  localisations = require('./routes/localisations'),
  types = require('./routes/types'),
  prelevementTypes = require('./routes/prelevementTypes'),
  cors = require('cors');

var app = express();


app.set('port', process.env.PORT || 9000);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE");
  next();
});

// JSON API

app.use('/api/bills', bills);
app.use('/api/localisations', localisations);
app.use('/api/types', types);
app.use('/api/prelevementTypes', prelevementTypes);


app.listen(app.get('port'), function () {
  console.log('Server listening on http://localhost:%d/', app.get('port'));
});

