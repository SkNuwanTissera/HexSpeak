'use strict';

const bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose');

mongoose.Promise = global.Promise;

require('./models/user.model.js');
require('./models/item.model.js');
require('./models/vendor.model.js');
require('./models/drug.model.js');
require('./models/prescription.model.js');

const UserRouter = require('./routes/user.route.js');
const PrescriptionRouter = require('./routes/prescription.route.js');
const ItemRouter = require('./routes/item.route.js');
const VendorRouter = require('./routes/vendor.route.js');
const DrugRouter = require('./routes/drug.route.js');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/pharmacy', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

app.use('/app', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/modules', express.static(__dirname + '/modules'));
app.use('/controllers', express.static(__dirname + '/controllers'));
app.use('/models', express.static(__dirname + '/models'));
app.use('/routes', express.static(__dirname + '/routes'));
app.use('/services', express.static(__dirname + '/services'));
app.use('/test', express.static(__dirname + '/test'));
app.use('/app/modules', express.static(__dirname + '/bower_components'));


app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/users', UserRouter);
app.use('/items', ItemRouter);
app.use('/vendors',VendorRouter);
app.use('/drugs',DrugRouter);
app.use('/prescriptions',PrescriptionRouter);

app.get('/app/vendors', (req, res, next) => {
    res.sendFile(__dirname + '/public/vendor.html');
});

app.get('/app/*', (req, res, next) => {
    res.sendFile(__dirname + '/public/indexx.html');
});

app.listen(4000, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('app listening on port 4000');
});

//for unit testing
module.exports = app;