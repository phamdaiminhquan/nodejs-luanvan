const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Adv = new Schema({
    image: { type: String, maxLength: 255 },
    alt: { type: String, maxLength: 255 },
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Adv', Adv, 'adv');
