'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
    //     type: Date,
    //     required: true
    // },
    //
    // ranking: {
    //     type: Number,
    //     unique: true,
    //     required: true
    // },

});

const Prescription = mongoose.model('User', PrescriptionSchema);

module.exports = Prescription;