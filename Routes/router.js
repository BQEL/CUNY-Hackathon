var express= require('express');
var router = express.Router();
var passport = require('passport');
var jwt= require('jwt-simple');
var user= require('../app/models/user');
var patient=require('../app/models/patient');

require('../config/passport')(passport);


//singup user
router.post('/signup', function (req, res) {
    if (!req.body.name || !req.body.password) {
        res.json({
            success: false
            , msg: 'Please pass user fields'
        });
    }
    else {
        var newUser = new User({
            email: req.body.email
            , password: req.body.password
            , name: req.body.name
            , lastname: req.body.lastname
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.json({
                    success: false
                    , msg: 'email exists.'
                });
            }
            res.json({
                success: true
                , msg: 'Successful created new user.'
            });
        });
    }
});

//authentication


router.post('/authenticate', function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.send({
                success: false
                , msg: 'Authentication failed. User not found.'
            });
        }
        else {
            // check if matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // create a token
                    var token = jwt.encode(user, config.secret);
                    // return inf + JSON token
                    res.json({
                        success: true
                        , token: 'JWT ' + token
                    });
                }
                else {
                    res.send({
                        success: false
                        , msg: 'Wrong password.'
                    });
                }
            });
        }
    });
});
//need to specify jwt token on headers
router.get('/personalInfo', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            email: decoded.email
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({
                    success: false
                    , msg: 'Authentication failed. User not found.'
                });
            }
            else {
                res.json({
                    success: true
                    , name: user.name
                    , lastname: user.lastname
                    , email: user.email
                });
            }
        });
    }
    else {
        return res.status(403).send({
            success: false
            , msg: 'No token provided.'
        });
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

module.exports=router;