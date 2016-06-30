var mongoose = require('mongoose');

var clientsSchema = mongoose.Schema({

  name: { type: String, required: true },
  phone: { type: Number, required: true, min: 1000000000, max: 9999999999 },
  number: { type: Number, required: true, min: 1 },
  reminderDate: {}

});

module.exports = mongoose.model('Clients', clientsSchema);
