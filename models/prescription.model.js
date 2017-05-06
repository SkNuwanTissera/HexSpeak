'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({

    // patientId: {
    //     type: String,
    //     required: true
    // },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    height:{
        type: String
        // required: true

    },

    weight: {
        type: String
        // required: true
    },

    bloodGroup: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },

    contactNo: {
        type: String,
        // required: true
    },

    email: {
        type: String
    },

    customerType: { //registered or not
        type: String,
        // required: true
    },
    doctor: {
        type: String,
        // required: true
    },



    // medicine: {
    //     list1: [ ]
    // },

    dateOfIssue: {
        type: String,
        required: true
    },

    dateOfExpire: {
        type: String,
        required: true
    },

    description:{
        type: String

    },






});

const Prescription = mongoose.model('User', PrescriptionSchema);

module.exports = Prescription;