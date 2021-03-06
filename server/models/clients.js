var mongoose = require('mongoose');

var clientsSchema = mongoose.Schema({

  name: { type: String, required: true },
  phone: { type: Number, required: true, min: 100000000, max: 9999999999 },
  number: { type: Number, required: true, min: 1 },
  reminderDate: {type: Date}

});

module.exports = mongoose.model('Clients', clientsSchema);
