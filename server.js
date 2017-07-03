'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var dotenv = require('dotenv');
const node_acl = require( 'acl' );
const expressValidator = require('express-validator');


mongoose.Promise = global.Promise;

//using the dotenv library to load our environmental variables from the .env
dotenv.load();

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;

//load models
require('./models/user.model.js');
require('./models/item.model.js');
require('./models/vendor.model.js');
require('./models/drug.model.js');
require('./models/prescription.model.js');
require('./models/order.model.js');

//load passportJS configuration
require('./oauth/passport.js')(passport);

//load routes
const UserRouter = require('./routes/user.route.js');
const PrescriptionRouter = require('./routes/prescription.route.js');
const ItemRouter = require('./routes/item.route.js');
const VendorRouter = require('./routes/vendor.route.js');
const DrugRouter = require('./routes/drug.route.js');
const MainRouter = require('./routes/main.route.js');
const MailRouter = require('./routes/mail.route.js');
const SMSRouter = require('./routes/sms.route.js');
const OrderMailRouter = require('./routes/order.mail.route.js');
const OrderRouter = require('./routes/order.route.js');

// Init App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // to get information from html forms

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.set(cookieParser());

//express validation
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());

//global vars
// app.use(req,res,next=>{
//    res.locals.user=req.user ||null;
// });

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Load View Engine
app.set('views', __dirname + '/public'); // set up ejs to be looked up in public dir
app.set('view engine', 'ejs'); // set up ejs for templating

//connect to db
mongoose.connect('mongodb://localhost:27017/pharmacy', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

app.use('/app', express.static(__dirname + '/public'));
app.use('/modules', express.static(__dirname + '/modules'));
app.use('/controllers', express.static(__dirname + '/controllers'));
app.use('/models', express.static(__dirname + '/models'));
app.use('/routes', express.static(__dirname + '/routes'));
app.use('/services', express.static(__dirname + '/services'));
app.use('/test', express.static(__dirname + '/test'));
app.use('/app/modules', express.static(__dirname + '/bower_components'));


app.use('/app', MainRouter);
app.use('/users', UserRouter);
app.use('/items', ItemRouter);
app.use('/vendors',VendorRouter);
app.use('/prescriptions',PrescriptionRouter);
app.use('/email',MailRouter);
app.use('/sms',SMSRouter);
app.use('/drugs',DrugRouter);
app.use('/ordermails',OrderMailRouter);
app.use('/orders',OrderRouter);



app.get('/app/placeorder', (req, res, next) => {
    res.sendFile(__dirname + '/public/vendor.sendmail.html');
});

app.get('/app/orders', (req, res, next) => {
    res.sendFile(__dirname + '/public/vendor.order.html');
});

app.get('/app/vendors', (req, res, next) => {
    res.sendFile(__dirname + '/public/vendor.html');
});
app.get('/app/dashboard', (req, res, next) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

app.get('/app/mailbox', (req, res, next) => {
    res.sendFile(__dirname + '/public/mailbox.html');
});

app.get('/app/users', (req, res, next) => {
    res.sendFile(__dirname + '/public/user.html');
});

app.get('/app/prescriptions', (req, res, next) => {
    res.sendFile(__dirname + '/public/prescription.html');
});

app.listen(4500, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('app listening on port 4500');
});

//for unit testing
module.exports = app;