'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const UserModel = mongoose.model('User');


const Router = express.Router();

Router.get('/', (req, res) => {

        UserModel.find().then(users => {
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

Router.post('/:id/comments', (req, res) => {
    let comment = new CommentModel(req.body);
    const userId = req.params.id;
    comment.user = userId;
    comment.save().then(commentDb => {
        return UserModel.findByIdAndUpdate(userId, {$push: {"comments": commentDb._id}})
    }).then(() => {
        return UserModel.findById(userId).populate('comments').exec();
    }).then(userDb => {
        res.json(userDb);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;