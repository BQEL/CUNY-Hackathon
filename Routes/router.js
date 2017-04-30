
var path = require('path');
var express= require('express');
var router = express.Router();
var passport = require('passport');
var jwt= require('jwt-simple');
var Psych= require('../app/models/user');
var patient=require('../app/models/patient');
var AccessToken=require('twilio').jwt.AccessToken;
var VideoGrant=AccesToken.VideoGrant;
require('dotenv').load();
require('../config/passport')(passport);
var randomName = require('./randomname');
var mediadevicesPath = path.join(__dirname, '../examples/mediadevices/public');
var quickstartPath = path.join(__dirname, '../quickstart/public');
app.use('/quickstart', express.static(quickstartPath));
app.use('/mediadevices', express.static(mediadevicesPath));

var vision = require('@google-cloud/vision')({
    projectId: 'api-project-420473628958'
    , keyFilename: 'visionkey.json'
});


var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccesToken.VideoGrant;
//google visio
var vision = require('@google-cloud/vision')({
    projectId: 'api-project-420473628958'
    , keyFilename: 'visionkey.json'
});
require('../config/passport')(passport);
//patient sign
router.post('/patientSign', function (req, res) {
    if (!req.body.name || !req.body.password || req.body.psych) {
        res.json({
            success: false
            , msg: 'Please pass Patient fields'
        });
    }
    else {
        Psych.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send({
                    success: false
                    , msg: 'Authentication failed. Doctor username was not found.'
                });
            }
            else {
                var newUser = new patient({
                    user: user.body.username
                    , password: req.body.password
                    , name: req.body.name
                    , lastname: req.body.lastname
                    , psych: req.body.psych
                });
                // save the user
                newUser.save(function (err) {
                    if (err) {
                        return res.json({
                            success: false
                            , msg: 'username exists.'
                        });
                    }
                    res.json({
                        success: true
                        , msg: 'Successful created new user.'
                    });
                });
            }
        });
    }
});

//singup Psych
router.post('/signup', function (req, res) {
    if (!req.body.name || !req.body.password) {
        res.json({
            success: false
            , msg: 'Please pass user fields'
        });
    }
    else {
        var newUser = new Psych({
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
//authentication Psych
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
<<<<<<< HEAD
router.post('/unsecure', function (req, res) {
    fs.readFile(req.files.image.path, function (err, data) {
        var imageName = req.files.image.name
            // If there's an error
        if (!imageName) {
            console.log("There was an error")
            res.redirect("/");
            res.end();
        }
        else {
            vision.detectText('./image.jpg', function (err, text) {
                res.send(text);
            });
        }
    });
});

// Tim's code - these are our Twilio tokens 
app.get('/token', function(request, response) {
var identity = randomName();
var token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

token.identity = identity;

var grant = new VideoGrant();
token.addGrant(grant);

response.send({
    identity: identity,
    token: token.toJwt()
  });
});


//upload screenshoot secure route
router.post('/upload', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        Psych.findOne({
            email: decoded.email
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({
                    success: false
                    , msg: 'Authentication failed. Psych not found.'
                });
            }
            else {
                fs.readFile(req.files.image.path, function (err, data) {
                    var imageName = req.files.image.name
                        // If there's an error
                    if (!imageName) {
                        console.log("There was an error")
                        res.redirect("/");
                        res.end();
                    }
                    else {
                        vision.detectText('./image.jpg', function (err, text) {
                            res.send(text);
                        });
                    }
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

//get token
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
module.exports = router;