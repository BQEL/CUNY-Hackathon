var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
//userModel  schema
var patientSchema = new Schema({
    patientid: {
        type: String
        , unique: true
        , required: true
    }
    , username: {
        type: String
        , unique: true
        , required: true
    }
    , password: {
        type: String
        , required: true
    }
    , firstname: {
        type: String
    }
    , lastname: {
        type: String
    }
    , psych: {
        type: String
        , required: true
    }
});
patientSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});
patientSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('Patient', patientSchema);