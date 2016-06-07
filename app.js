var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var mongoose        = require('mongoose');
var passport        = require('passport');
var localStrategy  = require('passport-local');
var request         = require('request');


// Schemas
var User = require('./models/userModel');
var Weather = require('./models/weatherModel');

// Global Variable
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


// Passport Config
app.use(require('express-session')({
  secret: "Some secret",
  resave: false,
  saveUninitialized: false
}));

// Checks for a user on every route(.locals). next(); keeps the code moving
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Using Routes | This needs to go below Passport
app.use(indexRoutes);
app.use(logingRoutes);


app.listen(port, portIP, function() {
  console.log('Server has started.. ' + port);
})
