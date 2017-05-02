const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    mobileNo: {
        type: String
    },
    email: {
        type: String
    }


});

const Vendor = mongoose.model('Item', vendorSchema);

module.exports = Vendor;