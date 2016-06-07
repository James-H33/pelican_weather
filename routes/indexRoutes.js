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
      Weather.find({}, function(err, loc) {
        if(err) {
          console.log(err);
        } else {
          res.render('index', {location: loc, weather: weatherData, user: req.user});
          return weatherData;
        }
      });
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

  // Weather.create(newLocations, function(err, location) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(location);
  //
  //     Weather.find({}, function(err, loc) {
  //       if(err) {
  //         console.log(err);
  //       } else {
  //         res.render('index', {location: loc, weather: weatherData, user: req.user});
  //       }
  //     });
  //   }
  // });
});


router.delete('/:id', function(req, res) {

  // User.findById(req.user.id, function(err, thatUser) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     thatUser.weatherSaves.findByIdAndRemove(req.params.id, function(err, foundWeather) {
  //       if (err) {
  //         console.log(err + 'weatherSaves!!');
  //       } else {
  //         console.log('Deleted' + foundWeather);
  //         res.redirect('/');
  //       }
  //     })
  //   }
  // })

  User.findByIdAndRemove(req.params.id, req.body.weather, function(err, item) {
    if(err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log('Deleted' + item);
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
