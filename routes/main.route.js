'use strict';

const express = require('express');
const passport = require('passport');

const Router = express.Router();

Router.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

// Router.get('/logout', function(req, res) {
//
//     // render the page and pass in any flash data if it exists
//     res.render('login.ejs', { message: req.flash('loginMessage') });
// });

Router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/app/users', // redirect to the secure profile section
    failureRedirect : '/app/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages

}),(req,res)=>{
    console.log('Successfull!!');
    console.log(req.user);
});

module.exports = Router;
