const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Orderdetails = new Schema({
    foodid: {
        type: Schema.Types.ObjectId,        
        ref: "Food"
    },
    amount: { type: String, required: true, },
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Orderdetails', Orderdetails, 'orderdetails');
