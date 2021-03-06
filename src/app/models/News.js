const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema({
    title: { type: String, required: true, },
    content: { type: String, required: true, },
    image: { type: String, maxLength: 255 },
    
});

module.exports = mongoose.model('News', News, 'news');