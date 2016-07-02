var Admin = require('./../models/admin.js')
var csv = require('csv');
var fs = require('fs');

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

    uploadFile: function(req, res) {
      var file = req.files.file.path;
      fs.readFile(file, 'utf-8', function(err, data){
        csv.parse(data, function(parsedErr, parsedData) {
          var newArr = [];
        parsedData.forEach(function(e, i, self) {
          if (i !== 0) {
            newArr.push({
              'Name': e[0],
              'Phone': e[1],
              'Number of Weeks': e[2]
            })
          }
        })
          console.log(newArr);
        })
      })
    }





}
