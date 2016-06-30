var mongoose = require('mongoose');

var defaultMessageSchema = mongoose.Schema({

  message: { type: String, required: true }

});

module.exports = mongoose.model('DefaultMessage', defaultMessageSchema);
