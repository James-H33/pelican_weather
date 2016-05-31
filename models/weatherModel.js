var mongoose = require('mongoose');

var weatherSchema = new mongoose.Schema({
  location: String,
});

module.exports = mongoose.model('Weather', weatherSchema);
