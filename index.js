var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var jwt = require('jwt-simple');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(passport.initialize());

app.get('/',function(req,res){
    res.send('Resume log in/sign up site');
});
mongoose.connect(config.database);
require('./config/passport')(passport);
var apiRoutes = express.Router();
//sing up form
apiRoutes.post()
app.listen(3000,function(){
    console.log("On 3000")
});
