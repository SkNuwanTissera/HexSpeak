'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DrugSchema = new Schema({

    drugName: {
        type: String

    },

    drugType: {  // generic and specific
        type: String

    },

    manufacturer: {
        type: String

    },

    genericName :{
        type: String

    },

    dateOfManufacture :{
        type: String

    },

    category :{ //dangerous or not
        type: String

    },

    dateOfExp :{
        type: String

    },

    quantity :{
             type : String

    },

    batchNo :{
            type : String

    },
    price:{
        type: Number
    }

//     vendors: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Vendor'
// }]


});

const Drug = mongoose.model('Drug', DrugSchema);

module.exports = Drug;


//Vendors was commented because vendor obj was referred to the vendor Model and data wasnt getting added to the table because of it