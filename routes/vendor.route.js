'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const VendorModel = mongoose.model('Vendor');


const Router = express.Router();

Router.get('/', (req, res) => {
    VendorModel.find().then(vendors => {
        res.json(vendors);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    VendorModel.findById(req.params.id).then(vendor => {
        res.json(vendor || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const vendor = new VendorModel(req.body);
    vendor.save().then(vendor => {
        res.json(vendor);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/:id', (req, res) => {
    const vendor = req.body;
    delete vendor._id;
    const vendorID = req.params.id;
    VendorModel.findByIdAndUpdate(vendorID, {$set: vendor}).then(vendorDb => {
        res.json(vendor);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id', (req, res) => {
    VendorModel.findByIdAndRemove(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

// Router.get('/', (req, res) => {
//     VendorModel.nextCount(function(err, count){
//         res.send(count.toString());
//     });
//
// });

module.exports = Router;