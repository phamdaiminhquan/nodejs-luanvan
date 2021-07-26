const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const News = new Schema({
    title: { type: String, required: true, },
    content: { type: String, required: true, },
    slug: { type: String, slug: "title", unique: true },
    image: { type: String, maxLength: 255 },
});

module.exports = mongoose.model('News', News, 'news');