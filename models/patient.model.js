const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required:true
    },
    address: {
        type: String
    },
    mobileNo: {
        type: String
    },
    email: {
        type: String
    },
    drugIssued: {
        type: String
    }

});

const Patient = mongoose.model('Item', PatientSchema);

module.exports = Patient;