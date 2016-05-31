var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  weatherLocations: [String]
});

module.exports = mongoose.model('User', userSchema);