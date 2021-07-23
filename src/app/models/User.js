const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const userSchema = new Schema({
    phone: {    
        type: String,
        unique: true, 
        minlength: [10, 'Số điển thoại ít nhất 10 số'], 
        required: [true, 'Vui lòng nhập số điện thoại'], 
    },
    pin: { 
        type: String, 
        minlength: [10, 'Số điển thoại ít nhất 10 số'], 
        required: [true, 'Vui lòng nhập pin'], 
    },
}, { 
    timestamps: true,
});
module.exports = mongoose.model('User', userSchema);
