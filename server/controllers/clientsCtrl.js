// REQUIRE DEPENDENCIES
// ============================================================
var Clients = require('./../models/clients');
var Admin = require('./../models/admin')
// EXPORT METHODS
// ============================================================
module.exports = {
  // CRUD METHODS
  // ============================================================
  read: function(req, res) {
    Clients.find(req.query, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  },
  create: function(req, res) {
    Clients.create(req.body, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      Admin.findByIdAndUpdate(req.user._id, {$push:{'clients': result._id}}, function(err, result) {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).send(result);
      })
    });

  },
  update: function(req, res) {
    Clients.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  },
  delete: function(req, res) {
    Clients.findByIdAndRemove(req.params.id, function(err, result) {
      // if (err) {
      //   res.status(500).send(err);
      // }
      // res.status(200).send(result);
    });
    Admin.findByIdAndUpdate(req.user._id, {$pull:{'clients': req.params.id}}, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    })
  }
  // OTHER METHODS
  // ============================================================
};
