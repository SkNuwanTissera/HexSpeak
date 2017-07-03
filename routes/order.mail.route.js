'use strict';

const express = require('express'),

nodemailer = require('nodemailer');

const Router = express.Router();

Router.get('/', (req, res) => {
    res.send('MailServer');
});


Router.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure:false,
        port:25,
        auth: {
            user: 'hexspeakpharmacy@gmail.com', // Your email id
            pass: '123Qwerty', // Your password
        },
        tls: { rejectUnauthorized: false }
    });


    const text = "<html> " +
        "<body> " +
        "<h1>Order From HexSpeak Pharmacy</h1>" +"<br>"+
        "<h3>Drug : "+req.body.drug+"</h3>"+
        "<h3>Vendor : "+req.body.vendor+"</h3>"+
        "<h3>Quantity : "+req.body.qty+"</h3>"+
        "<h3>Order Date : "+req.body.note+"</h3>"+
        "<h3>Description : "+req.body.date+"</h3>"+"<br>"+
        "<h5>HexSpeak Pharmacy Systems </h5> " +
        "<h5>Sri Lanka</h5>" +
        "</body> " +
        "</html>"; //req.body;


    let mailOptions = {
        from: 'hexspeakpharmacy@gmail.com', // sender address
        to: req.body.email,// list of receivers
        subject: 'Order From HexSpeak Pharmacy', // Subject line
        html: text //, // plaintext body
        // html: '<b>Hello world ?</b>' // You can choose to send an HTML body instead
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