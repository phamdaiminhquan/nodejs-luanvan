const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const bcrypt = require('bcrypt');
mongoose.plugin(slug);

const userSchema = new Schema({
    fullName: { type: String},
    phone: {    
        type: String,
        required: [true, 'EIGHT cần biết số điện thoại của bạn'], 
        unique: true,
        minlength: [10, 'EIGHT không nghĩ đây là số điện thoại chính xác, nó cần ít nhất 10 số'], 
    },
    pin: { 
        type: String, 
        required: [true, 'EIGHT cần biết mã PIN của bạn'], 
        minlength: [6, 'Mã PIN này có vẻ quá yếu, 6 số sẽ là một mã PIN đủ mạnh'], 
    },
    avatar: { type: String},
    sex: { type: String},
    email: { type: String},
    default: {
        type: Schema.Types.ObjectId,        
        ref: "Address"
    },
}, { 
    timestamps: true,
});
// kích hoạt một chức năng trước khi dữ liệu được lưu vào db
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.pin  = await bcrypt.hash(this.pin, salt)
    next()
})

// phương thức tĩnh để đăng nhập người dùng
userSchema.statics.login = async function(phone, pin){
    const user = await this.findOne({ phone })
    if(user){
        const auth = await bcrypt.compare(pin, user.pin)
        if(auth){
            return user
        }
        throw Error('Sai số điện thoại hoặc mã PIN')
    }
    throw Error('Sai số điện thoại hoặc mã PIN')
}
module.exports = mongoose.model('User', userSchema);
