var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var router = require('./Routes/router');
var jwt = require('jwt-simple');


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


app.listen(3000, function () {
    console.log("On 3000")
});