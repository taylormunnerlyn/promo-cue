var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var adminCtrl = require('./controllers/adminCtrl');
var clientsCtrl = require('./controllers/clientsCtrl');
var defaultMessageCtrl = require('./controllers/defaultMessageCtrl');
var session = require('express-session');
var passport = require('./services/passport');
var config = require('./config');
var textCtrl = require('./controllers/text/textCtrl');
var cron = require('./cron');
var multiparty = require('multiparty');
var connectMultiparty = require('connect-multiparty');
var csv = require('csv');

var multipartyMiddleware = connectMultiparty();

var isAuthed = function(req, res, next) {
    if (!req.isAuthenticated()) return res.status(401).send();
    return next();
}

var app = express();
var mongoURI = config.MONGO_URI;
var port = config.port;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../public'));
app.use(session({
    secret: config.session_secret,
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

/*
    #                           #######
   # #   #    # ##### #    #    #       #    # #####  #####  #####  ####
  #   #  #    #   #   #    #    #       ##   # #    # #    #   #   #
 #     # #    #   #   ######    #####   # #  # #    # #    #   #    ####
 ####### #    #   #   #    #    #       #  # # #    # #####    #        #
 #     # #    #   #   #    #    #       #   ## #    # #        #   #    #
 #     #  ####    #   #    #    ####### #    # #####  #        #    ####
 */
app.post('/register', adminCtrl.create);
app.get('/me', isAuthed, adminCtrl.me);
app.get('/admin', adminCtrl.read);
app.put('/admin', adminCtrl.update);
app.post('/login', passport.authenticate('local', {
    successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
    req.logout();
    return res.status(200).send('logged out');
})

/*
 #     # ####### ######  ####### #          ####### #     # ######  ######  ####### ### #     # #######  #####
 ##   ## #     # #     # #       #          #       ##    # #     # #     # #     #  #  ##    #    #    #     #
 # # # # #     # #     # #       #          #       # #   # #     # #     # #     #  #  # #   #    #    #
 #  #  # #     # #     # #####   #          #####   #  #  # #     # ######  #     #  #  #  #  #    #     #####
 #     # #     # #     # #       #          #       #   # # #     # #       #     #  #  #   # #    #          #
 #     # #     # #     # #       #          #       #    ## #     # #       #     #  #  #    ##    #    #     #
 #     # ####### ######  ####### #######    ####### #     # ######  #       ####### ### #     #    #     #####
 */
app.get('/clients', clientsCtrl.read);
app.post('/clients', clientsCtrl.create);
app.put('/clients/:id', clientsCtrl.update);
app.delete('/clients/:id', clientsCtrl.delete);

app.get('/defaultMessage', defaultMessageCtrl.read);
app.post('/defaultMessage', defaultMessageCtrl.create);
app.put('/defaultMessage/:id', defaultMessageCtrl.update);
app.delete('/defaultMessage/:id', defaultMessageCtrl.delete);

app.post('/text', textCtrl.sendText);
app.post('/csv', multipartyMiddleware, adminCtrl.uploadFile);


// cron.start();

mongoose.connect(mongoURI);
app.listen(port, function() {
    console.log('listening on port 3000 my dude!')
});
