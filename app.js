var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongoose        = require('mongoose');
var passport        = require('passport');
var localStratedgy  = require('passport-local');
var request = require('request');

var weatherData;

// Ports
var port = process.env.PORT || 6000;
var portIP = process.env.IP;

//  Require Routes
var indexRoutes = require('./routes/indexRoutes')
var logingRoutes = require('./routes/logingRoutes');

mongoose.connect('mongodb://localhost/pelican_weather');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.use(methodOverride('_method'));



// Use Routes
app.use(indexRoutes);
app.use(logingRoutes);


app.listen(port, portIP, function() {
  console.log('Server has started.. ' + port);
})
