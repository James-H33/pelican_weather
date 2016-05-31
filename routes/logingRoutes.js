var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  var username = req.body.username;
  res.send(username);
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
  res.render('login');
});


module.exports = router;
