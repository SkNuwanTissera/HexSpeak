'use strict';

const express = require('express'),
    mongoose = require('mongoose'),
/*Sending Mails*/
  nodemailer = require('nodemailer');

mongoose.set('debug', false);

const Router = express.Router();

Router.get('/', (req, res) => {
        res.send('SMS Server!');
});


Router.post('/', (req, res) => {
    // Twilio Credentials
    var accountSid = 'AC8b5a77776319f278f0dc191c62c6b6da';
    var authToken = 'a6ff975c3d7100d1b3da754a28956aae';

//require the Twilio module and create a REST client
    var client = require('twilio')(accountSid, authToken);

    client.messages.create({
        to: "+15558675309",
        from: "+15017250604",
        body: "This is the ship that made the Kessel Run in fourteen parsecs?",
    }, function(err, message) {
        console.log(message.sid);
    });
});

module.exports = Router;