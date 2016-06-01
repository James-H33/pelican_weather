var mongoose = require('mongoose');

var User = require('./models/userModel');
var Weather = require('./models/userModel');

var data = [
  {
    username: 'james',
    password: 'password',
  },
  {
    username: 'bob',
    password: 'password1',
  },
]

function seedDB() {
  User.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted');
      data.forEach(function(seed) {
        User.create(seed, function(err, newUser) {
          if (err) {
            console.log(err);
          } else {
            newUser.save();
            console.log('User Created');
          }
        })
      })
    }
  });
}

module.exports = seedDB;
