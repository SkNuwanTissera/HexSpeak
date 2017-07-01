'use strict';

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

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
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    age:{
        type:String
    },
    height:{
        type:String
    },
    weight:{
        type:String
    },
    email: {
        type: String,

    },
    userType: {
        type: String,

    },
    hospital: {
        type: String
    },
    bloodGroup:{
        type: String
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

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;