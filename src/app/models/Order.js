const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Order = new Schema({
    totalmoney: { type: String},
    amount: { 
        type: String,
        default: ''
    },
    orderstatus: { type: String}
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Order', Order, 'order');
