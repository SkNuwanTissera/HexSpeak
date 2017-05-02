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

const User = mongoose.model('User', UserSchema);

module.exports = User;