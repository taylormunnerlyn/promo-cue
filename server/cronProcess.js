var moment = require('moment');
var Clients = require('./models/clients')
var Admin = require('./models/admin');
var config = require('./config')
var accountSid = config.sid;
var authToken = config.authToken;

var client = require('twilio')(accountSid, authToken);

module.exports = {
    sendMessage: function() {
      console.log('something');
        var today = moment().startOf('day');
        var tomorrow = moment(today).add(1, 'days');
        Clients.find({ 'reminderDate': { '$gte': today.toDate(), '$lt': tomorrow.toDate() } }, function(err, response) {
          if (err) res.status(500).send(err);
          asyncLoop(0, response);
        })


        function asyncLoop(index, array) {
          if (index >= array.length) {
            asyncEnd();
            return;
          }
          Admin.find({ clients: array[index]._id })
          .populate('defaultMessage')
          .exec(function(err, response) {
            console.log(response);
            client.messages.create({
                to: array[index].phone,
                from: "+18012141358",
                body: response[0].defaultMessage.message
            }, function(err, message) {
                asyncLoop(index + 1, array);
            });
          })

        }

        function asyncEnd() {
          console.log('Done');
        }
    }
}
