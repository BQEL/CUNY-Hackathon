'use strict';
require('dotenv').load();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var router = require('./Routes/router');
var jwt = require('jwt-simple');
var http= require('http');
var AccessToken=require('twilio').jwt.AccessToken;
var VideoGrant=AccesToken.VideoGrant;
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//console log
app.use(morgan('dev'));
mongoose.connect(config.database);

//passport initialization
app.use(passport.initialize());

app.use('/', router);


var server=http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port);