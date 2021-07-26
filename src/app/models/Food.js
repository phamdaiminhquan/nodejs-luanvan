const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Food = new Schema({
    name: { type: String, maxLength: 255, required: true, },
    foodtypeid: {
        type: Schema.Types.ObjectId,        
        ref: "Foodtype"
    },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name", unique: true },
    price: { type: String, maxLength: 255, required: true, },
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Food', Food, 'food');
