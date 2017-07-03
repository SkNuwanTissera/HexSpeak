'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const UserModel = mongoose.model('User');

const Router = express.Router();

Router.get('/', (req, res) => {

        UserModel.find().then(users => {
           // var UserCount = users.length;
        res.json(users);

    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    UserModel.findById(req.params.id).then(user => {
        res.json(user || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const user = new UserModel(req.body);
    user.password = user.generateHash(req.body.password);
    user.save().then(user => {
        res.json(user);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/:id', (req, res) => {
    const user = req.body;
    delete user._id;
    const userId = req.params.id;
    UserModel.findByIdAndUpdate(userId, {$set: user}).then(userDb => {
        res.json(user);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id', (req, res) => {
    UserModel.findByIdAndRemove(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});


module.exports = Router;