var express = require('express');
var app     = express();
var request = require('request');
var weatherData;

// Ports
var port = process.env.PORT || 6000;
var portIP = process.env.IP;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');


app.get('/', function(req, res) {
  var query = req.query.search;
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+query+'&units=imperial&appid=cdb448c3430329166314eb0602f6c532';

  request(url, function(error, response, body) {
    var parsedData = JSON.parse(body);
    weatherData = parsedData;

    if (!error && response.statusCode == 200) {
      res.render('index', {weather: weatherData});
    }
  });
});

app.listen(port, portIP, function() {
  console.log('Server has started.. ' + port);
})
