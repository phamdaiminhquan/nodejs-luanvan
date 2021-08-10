const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ordercancel = new Schema({
    orderid: {
        type: Schema.Types.ObjectId,        
        ref: "Order"
    },
    reason: { type: String},
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Ordercancel', Ordercancel, 'ordercancel');
