'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,

    },
    designation: {
        type: String,

    },
    hospital: {
        type: String
    }


});

const User = mongoose.model('User', UserSchema);

module.exports = User;