// Twilio Credentials
var config = require('./../../config')
var accountSid = config.sid;
var authToken = config.authToken;


//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

module.exports = {
    sendText: function(req, res) {
        for (var i = 0; i < req.body.to.length; i++) {
            client.messages.create({
                to: req.body.to[i],
                from: "+18012141358",
                body: req.body.message
            }, function(err, message) {

            });
        }
        res.send('messages sent');
    }
}
