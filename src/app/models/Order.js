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
    payment: { type: String},
    orderstatus: { type: String},
    idAddress: {
        type: Schema.Types.ObjectId,        
        ref: "address"
    },
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Order', Order, 'order');
