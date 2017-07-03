'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const OrderModel = mongoose.model('Order'),
    DrugModel = mongoose.model('Drug');

const Router = express.Router();

Router.get('/', (req, res) => {
    OrderModel.find().then(orders => {
        res.json(orders);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    OrderModel.findById(req.params.id).then(order => {
        res.json(order || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const order = new OrderModel(req.body);
    order.save().then(order => {
        res.json(order);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/:id', (req, res) => {
    const order = req.body;
    delete order._id;
    const orderId = req.params.id;
    OrderModel.findByIdAndUpdate(orderId, {$set: order}).then(orderDb => {
        res.json(order);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});


module.exports = Router;