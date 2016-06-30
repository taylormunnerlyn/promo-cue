var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var adminSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    clients: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Clients' }
    ],
    messages: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'DefaultMessage' }
    ],
    defaultMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DefaultMessage'
    }
    // csv: {
    //
    // }


});

adminSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next(null, user);
});

adminSchema.methods.verifyPassword = function(reqBodyPassword) {
    var user = this;
    return bcrypt.compareSync(reqBodyPassword, user.password);
}

module.exports = mongoose.model('Admin', adminSchema);
