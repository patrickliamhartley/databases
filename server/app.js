var express = require('express');
var db = require('./db');
var Connection = db.theConnection;
// console.log(Connection);
// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// var headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10, // Seconds.

// };

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('access-control-allow-headers', 'content-type, accept');
  

  next();
});

// Set up our routes
app.use('/classes', router);

// Serve the client files
app.use(express.static(__dirname + '/../client/client'));

// If we are being run directly, run the server.
if (!module.parent) {
  Connection.connect();
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}



