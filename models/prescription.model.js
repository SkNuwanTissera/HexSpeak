'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
    //
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
        // required: true
    },

    gender: {
        type: String
        // required: true
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
        type: String
        // required: true
    },
    address: {
        type: String
        // required: true
    },

    contactNo: {
        type: String
        // required: true
    },

    email: {
        type: String
        // required: true
    },

    customerType: { //registered or not
        type: String
        // required: true
    },
    doctor: {
        type: String
        // required: true
    },
    allergies:{
        type:String
    },
    medicine1:
        {
            name:{
                type:String
            },
            cards:{
                type:String
            },
            instructions:{
                type:String
            }

        }
    ,
    medicine2:
        {
            name:{
                type:String
            },
            cards:{
                type:String
            },
            instructions:{
                type:String
            }

        }
    ,
    medicine3:
        {
            name:{
                type:String
            },
            cards:{
                type:String
            },
            instructions:{
                type:String
            }

        }
    ,
    medicine4:
        {
            name:{
                type:String
            },
            cards:{
                type:String
            },
            instructions:{
                type:String
            }

        }
    ,
    medicine5:
        {
            name:{
                type:String
            },
            cards:{
                type:String
            },
            instructions:{
                type:String
            }

        }
    ,
    medicine6:
        {
            name:{
                type:String
            },
            cards:{
                type:String
            },
            instructions:{
                type:String
            }

        }
    ,
    medicine7:
        {
            name:{
                type:String
            },
            cards:{
                type:String
            },
            instructions:{
                type:String
            }

        }
    ,
    medicine8:
        {
            name:{
                type:String
            },
            cards:{
                type:String
            },
            instructions:{
                type:String
            }

        }
    ,medicine9:
        {
            name:{
                type:String
            },
            cards:{
                type:String
            },
            instructions:{
                type:String
            }

        }
    ,
    dateOfIssue: {
        type: String,
        // required: true
    },

    dateOfExpire: {
        type: String,
        // required: true
    },

    description:{
        type: String,
        // required: false

    },






});

const Prescription = mongoose.model('Prescription', PrescriptionSchema);

module.exports = Prescription;