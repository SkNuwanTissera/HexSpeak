'use strict';

const express = require('express');
const mongoose = require('mongoose');


mongoose.set('debug', false);

const DrugModel = mongoose.model('Drug');
const VendorModel = mongoose.model('Vendor');


const Router = express.Router();


Router.route('/')
//get all drug details
    .get(function (req,res) {
        DrugModel.find(function (err,drugs) {
            if(err){
                res.send(err);
            }
            res.json(drugs);
            console.log("get is ok");
        });

    })
//adding drug details to the system
    .post(function (req,res) {
        var drug = new DrugModel();
        drug.drugName = req.body.drugName;
        drug.drugType = req.body.drugType;
        drug.manufacturer = req.body.manufacturer;
        drug.genericName = req.body.genericName;
        drug.dateOfManufacture =req.body.dateOfManufacture;
        drug.category = req.body.category;
        drug.dateOfExp = req.body.dateOfExp;
        drug.quantity = req.body.quantity;
        drug.batchNo = req.body.batchNo;
        //drug.vendors = req.body.vendors;
        console.log("cALL"+req.body.name);

        drug.save(function (err)
        {
            if(err)
            {
                res.send(err);
            }
            //res.json({message: req.body.drugName + ' drug created'});
            console.log("ssss");
        });

    });





// Router.get('/', (req, res) => {
//     DrugModel.find().exec().then(drugs => {
//         res.json("Drugs:"+drugs);
//
//     }).catch(err => {
//         console.error(err);
//         res.sendStatus(500);
//     });
// });
//
Router.get('/:id', (req, res) => {
    DrugModel.findById(req.params.id).then(drug => {
        res.json(drug || {});
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});
//
// Router.post('/', (req, res) => {
//     const drug = new DrugModel(req.body);
//     drug.save().then(drug => {
//         res.json(drug);
//     }).catch(err => {
//         console.error(err);
//         res.sendStatus(500);
//     });
//     res.json({message:"fuck yea!"});
// });
//
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
    console.log("update is ok");
});
//
Router.delete('/:id', (req, res) => {
    DrugModel.findByIdAndRemove(req.params.id).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});



module.exports = Router;