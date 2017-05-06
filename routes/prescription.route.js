'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const PrescriptionModel = mongoose.model('Prescription');


const Router = express.Router();

Router.get('/', (req, res) => {

    PrescriptionModel.find().then(prescriptions => {
        res.json(prescriptions);

    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.get('/:id', (req, res) => {
    PrescriptionModel.findById(req.params.id).then(prescription => {
        res.json(prescription || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/', (req, res) => {
    const prescription = new PrescriptionModel(req.body);
    prescription.save().then(prescription => {
        res.json(prescription);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.put('/:id', (req, res) => {
    const prescription = req.body;
    delete prescription._id;
    const prescriptionId = req.params.id;
    PrescriptionModel.findByIdAndUpdate(prescriptionId, {$set: prescription}).then(prescriptionDb => {
        res.json(prescription);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.delete('/:id', (req, res) => {
    PrescriptionModel.findByIdAndRemove(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

Router.post('/:id/comments', (req, res) => {
    let comment = new CommentModel(req.body);
    const prescriptionId = req.params.id;
    comment.prescription = prescriptionId;
    comment.save().then(commentDb => {
        return PrescriptionModel.findByIdAndUpdate(prescriptionId, {$push: {"comments": commentDb._id}})
    }).then(() => {
        return PrescriptionModel.findById(prescriptionId).populate('comments').exec();
    }).then(prescriptionDb => {
        res.json(prescriptionDb);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

module.exports = Router;