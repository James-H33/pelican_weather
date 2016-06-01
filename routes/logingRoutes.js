var express   = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');
var passport  = require('passport');
var User      = require('../models/userModel');

// Register Logic
router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  var newUser = {username: req.body.username}

  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, function() {
          res.redirect('/');
      });
    }
  })
});

// Login Logic
router.get('/login', function(req, res) {
  res.render('login', {user: req.user});
});

router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/login'
  }), function(req, res) {});


// Logout Logic
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


// Middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
    res.redirect('/login');
}


module.exports = router;
