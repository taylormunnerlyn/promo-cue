// REQUIRE DEPENDENCIES
// ============================================================
var DefaultMessage = require('./../models/defaultMessage');
var Admin = require('./../models/admin');
// EXPORT METHODS
// ============================================================
module.exports = {
  // CRUD METHODS
  // ============================================================
  create: function(req, res) {
    DefaultMessage.create(req.body, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      Admin.findByIdAndUpdate(req.user._id, {$push:{'messages': result._id}}, function(err, result) {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).send(result);
      })
    });
  },
  update: function(req, res) {
    DefaultMessage.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  },
  delete: function(req, res) {
    DefaultMessage.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  },
  read: function(req, res) {
    DefaultMessage.find(req.query, function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  }
  // OTHER METHODS
  // ============================================================
};
