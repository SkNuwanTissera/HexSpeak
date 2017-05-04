'use strict';

const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost:27017/pharmacy');

autoIncrement.initialize(connection);

const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    tp: {
        type: String
    },
    email: {
        type: String
    },
    company: {
        type: String
    }
});

VendorSchema.plugin(autoIncrement.plugin, 'Vendor');
var Vendor = connection.model('Vendor', VendorSchema);
//const Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = Vendor;