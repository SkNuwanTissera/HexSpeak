'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const ItemModel = mongoose.model('Item');


const Router = express.Router();

Router.get('/', (req, res) => {
        ItemModel.find().exec().then(items => {
        res.json("Items:"+items);

    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    ItemModel.findById(req.params.id).then(item => {
        res.json(item || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const item = new ItemModel(req.body);
    item.save().then(item => {
        res.json(item);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/:id', (req, res) => {
    const item = req.body;
    delete item._id;
    const itemId = req.params.id;
    ItemModel.findByIdAndUpdate(itemId, {$set: item}).then(itemDb => {
        res.json(item);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id', (req, res) => {
    ItemModel.findByIdAndRemove(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/:id/comments', (req, res) => {
    let comment = new CommentModel(req.body);
    const itemId = req.params.id;
    comment.item = itemId;
    comment.save().then(commentDb => {
        return ItemModel.findByIdAndUpdate(itemId, {$push: {"comments": commentDb._id}})
    }).then(() => {
        return ItemModel.findById(itemId).populate('comments').exec();
    }).then(itemDb => {
        res.json(itemDb);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;