var express = require('express');
var app     = express();
var request = require('request');

var port = process.env.PORT || 5000;
var portIP = process.env.IP;

app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index');
})

app.listen(port, portIP, function() {
  console.log('Server has started..');
})
