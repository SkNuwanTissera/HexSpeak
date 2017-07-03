'use strict';

const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost:27017/pharmacy');

autoIncrement.initialize(connection);

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    drug: {
        type: String,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    vendorEmail: {
        type: String,
    },
    qty: {
        type: String
    },
    note: {
        type: String
    },
    orderDate: {
        type: String
    },
    status: {
        type: String
    },
    receivedDate: {
        type: String
    }
});

OrderSchema.plugin(autoIncrement.plugin, 'Order');
var Order = connection.model('Order', OrderSchema);
//const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;