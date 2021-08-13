const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = new Schema({
    fullName: { type: String},
    phone: { type: String},
    email: { type: String},
    city: { type: String },
    district: { type: String },
    wards: { type: String },
    address: { type: String }
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Address', Address, 'address');
