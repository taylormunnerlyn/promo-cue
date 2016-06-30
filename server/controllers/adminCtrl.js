var Admin = require('./../models/admin.js')
var parser = require('csv-parse');

module.exports = {

    create: function(req, res) {
        Admin.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        });
    },

    read: function(req, res) {
        Admin.find(req.query)
        .populate('clients messages')
        .exec(function(err, result) {
          if (err) {
              res.status(500).send(err);
          } else {
              res.send(result);
          }
        })
    },
    update: function(req, res) {
      Admin.findByIdAndUpdate(req.user._id, req.body, function(err, result) {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).send(result);
      });
    },

    me: function(req, res) {
      if (!req.user) return res.status(401).send('current user not defined');
      Admin.find({ _id: req.user._id })
      .populate('clients messages')
      .exec(function(err, user) {
        console.log(user);
        if (err) {
            res.status(500).send(err);
        } else {
          user[0].password = null;
          return res.status(200).json(user[0]);
        }
      })

    },

    // uploadFile: function(req, res) {
    //
    // }





}
