'use strict';

const express = require('express'),
    mongoose = require('mongoose'),
/*Sending Mails*/
  nodemailer = require('nodemailer');

mongoose.set('debug', false);

const Router = express.Router();

Router.get('/', (req, res) => {
        res.send('MailServer');
});


Router.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tisseranuwansk81995@gmail.com', // Your email id
            pass: 'nimansaathukorala' // Your password
        }
    });
    const text = "<html> " +
        "<body> " +
        "<h1>Thank You "+req.body.firstName+" For Registering With Us!!</h1>" +
        "<h2>Your have been registerd as a "+req.body.userType+" :-)" +
        "<h3>Username : req.body.userName</h3>" +
        "<h3>Password : req.body.password</h3>" +
        "<h5>HexSpeak Pharmacy Systems </h5> " +
        "<h5>Sri Lanka</h5>" +
        "</body> " +
        "</html>"; //req.body;


    let mailOptions = {
        from: 'tisseranuwansk81995@gmail.com', // sender address
        to: req.body.email,//req.body.email , // list of receivers
        subject: 'HexSpeak Pharmacies', // Subject line
        html: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });
});

module.exports = Router;