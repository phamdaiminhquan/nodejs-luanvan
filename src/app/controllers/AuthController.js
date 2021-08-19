// const Food = require('../models/Food');
const { mongooseToObject } = require('../../util/mongoose');
const user_model = require('../models/user')
const jwt = require('jsonwebtoken')
const handleErrors = (err) => {
    let errors = { phone: '', pin: '' }
    if( err.message == 'Sai số điện thoại hoặc mã PIN'){
        errors.phone = 'Sai số điện thoại hoặc mã PIN' 
    }
    if (err.code === 11000) {
        errors.phone = 'Số điện thoại này đã tồn tại';
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}
// hàm tạo token
const maxAge = 3*24*60*60
const createToken = (id) =>{
    return jwt.sign( { id  }, 'next user secret', { 
        expiresIn: maxAge 
    })
}

class AuthController {

    //[GET] /login
    login_get(req, res, next) {
        res.render('auth/login');
    }

    //[GET] /signup
    signup_get(req, res, next) {
        res.render('auth/signup');
    }

    //[POST] /login
    async login_post(req, res, next) {
        console.log(req.body)
        const { phone, pin } = req.body
        try{
            const user = await user_model.login(phone, pin)
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
            res.status(200).json( { user: user._id })
        }
        catch(err){
            const errors = handleErrors(err)
            res.status(400).json({ errors })
        }
    }

    //[POST] /signup
    async signup_post(req, res, next) {
        const { phone, pin } = req.body
        try{
            const user = await user_model.create({ phone, pin })
            // tạo token
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
            res.status(201).json({ user: user._id })
        }
        catch(err){
            const errors = handleErrors(err)
            res.status(400).json({ errors })
        }
    }

    //[GET] /logout
    async logout_get(req, res, next) {
        res.cookie('jwt', '', {maxAge: 1 })
        res.redirect('/')   
    }
}
module.exports = new AuthController();
