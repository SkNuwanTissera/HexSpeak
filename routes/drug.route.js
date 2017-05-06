'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const DrugModel = mongoose.model('Drug'),
    VendorModel = mongoose.model('Vendor');


const Router = express.Router();

Router.get('/', (req, res) => {
    DrugModel.find().exec().then(drugs => {
        res.json("Drugs:"+drugs);

    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    DrugModel.findById(req.params.id).then(drug => {
        res.json(drug || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const drug = new DrugModel(req.body);
    drug.save().then(drug => {
        res.json(drug);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/:id', (req, res) => {
    const drug = req.body;
    delete drug._id;
    const drugId = req.params.id;
    DrugModel.findByIdAndUpdate(drugId, {$set: drug}).then(drugDb => {
        res.json(drug);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id', (req, res) => {
    DrugModel.findByIdAndRemove(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

// Router.post('/:id/vendors', (req, res) => {
//     let vendor = new VendorModel(req.body);
//     const drugId = req.params.id;
//     vendor.drug = drugId;
//     vendor.save().then(vendorDb => {
//         return DrugModel.findByIdAndUpdate(drugId, {$push: {"vendors": vendorDb._id}})
//     }).then(() => {
//         return DrugModel.findById(drugId).populate('vendors').exec();
//     }).then(drugDb => {
//         res.json(drugDb);
//     }).catch(err => {
//         console.error(err);
//         res.sendStatus(500);
//     });
// });

module.exports = Router;