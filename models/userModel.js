var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Weather = require('./weatherModel');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  weatherSaves: [ Weather.schema ]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
