var express        = require('express');
var router         = express.Router();
var mongoose       = require('mongoose');
var request        = require('request');
var Weather        = require('../models/weatherModel');
var User           = require('../models/userModel');
var weatherData;

router.get('/', function(req, res) {
  var query = req.query.search;
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+query+'&units=imperial&appid=cdb448c3430329166314eb0602f6c532';

  request(url, function(error, response, body) {
    var parsedData = JSON.parse(body);
    weatherData = parsedData;

    if (!error && response.statusCode == 200) {
      if (req.user == null) {
        var loc = null;
          res.render('index', {location: loc, weather: weatherData, user: req.user});
      } else {
        User.findById(req.user.id, function(err, foundUser) {
          if (err || foundUser.weatherSaves.length >= 3) {
            console.log(err);
            var loc = foundUser.weatherSaves;
            res.render('index', {location: loc, weather: weatherData, user: req.user});
          } else {
            var loc = foundUser.weatherSaves;
            res.render('index', {location: loc, weather: weatherData, user: req.user});
          }
        });
      }
    }
  });
});


router.post('/', isLoggedIn, function(req, res) {

  var cityName = weatherData.name; // if printed cityName = 'Tampa';

  var newLocations = {   // Makes object for weather schema to be saved.
    location: cityName,
  }

    User.findById(req.user.id, function(err, foundUser) {
      if (err || foundUser.weatherSaves.length >= 3) {
        console.log(err);
        var loc = foundUser.weatherSaves;
        res.render('index', {location: loc, weather: weatherData, user: req.user});
      } else {
        foundUser.weatherSaves.push(newLocations);
        foundUser.save();
        var loc = foundUser.weatherSaves;
        res.render('index', {location: loc, weather: weatherData, user: req.user});
      }
    })
});


router.delete('/:id', function(req, res) {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      var index;
      for (var i = 0; i < foundUser.weatherSaves.length; i++) {
        if (foundUser.weatherSaves[i]._id == req.params.id) {
           index = i;
         }
      }

      foundUser.weatherSaves[index].remove();
      foundUser.save();
      res.redirect('/');
    }
  });

});


// Middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
    res.redirect('/login');
}



module.exports = router;
