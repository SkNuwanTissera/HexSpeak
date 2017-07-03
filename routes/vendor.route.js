'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const VendorModel = mongoose.model('Vendor'),
    DrugModel = mongoose.model('Drug');

const Router = express.Router();

Router.get('/', (req, res) => {
    VendorModel.find().populate('drugs').exec().then(vendors => {
        res.json(vendors);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/drugs/:id', (req, res) => {
    VendorModel.find({ sellingDrugs: { "$in" : [req.params.id]} }).then(vendors => {
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
    const vendorId = req.params.id;
    VendorModel.findByIdAndUpdate(vendorId, {$set: vendor}).then(vendorDb => {
        res.json(vendor);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id', (req, res) => {
    VendorModel.findByIdAndRemove(req.params.id).then((vendor) => {
        const drugIds = vendor.drugs.map((drugId => drugId));
        return DrugModel.remove({_id: {$in: drugIds}});
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/:id/drugs', (req, res) => {
    let drug = new DrugModel(req.body);
    const vendorId = req.params.id;
    drug.vendor = vendorId;
    drug.save().then(drugDb => {
        return VendorModel.findByIdAndUpdate(vendorId, {$push: {"drugs": drugDb._id}})
    }).then(() => {
        return VendorModel.findById(vendorId).populate('drugs').exec();
    }).then(vendorDb => {
        res.json(vendorDb);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;