var express        = require('express');
var router         = express.Router();
var mongoose       = require('mongoose');
var request        = require('request');
var Weather        = require('../models/weatherModel');
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
          res.render('index', {location: loc, weather: weatherData});
          return weatherData;
        }
      });
    }
  });
});


router.post('/', function(req, res) {

  var cityName = weatherData.name; // if printed cityName = 'Tampa';

  var newLocations = {   // Makes object for weather schema to be saved.
    location: cityName,
  }

  Weather.create(newLocations, function(err, location) {
    if (err) {
      console.log(err);
    } else {
      console.log(location);

      Weather.find({}, function(err, loc) {
        if(err) {
          console.log(err);
        } else {
          res.render('index', {location: loc, weather: weatherData});
        }
      });
    }
  });
});


router.delete('/:id', function(req, res) {
  Weather.findByIdAndRemove(req.params.id, req.body.weather, function(err, item) {
    if(err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log('Deleted' + item);
      res.redirect('/');
    }
  });
});


module.exports = router;
