// const Food = require('../models/Food');
const { mongooseToObject } = require('../../util/mongoose');
const user_model = require('../models/user')

const handleErrors = (err)=>{
    let errors = { phone: '', pin: ''}
    

    if(err.code === 11000){
        errors.phone = 'so dien thoai nay da ton tai'
        return errors
    }

    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message
        })
    }

    return errors
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

    //[GET] /signup
    async login_post(req, res, next) {
        res.json("haha")
    }

    //[GET] /signup
    async signup_post(req, res, next) {
        const { phone , password } = req.body
        const user = await user_model.create({phone, password})
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(err => { 
            const errors = handleErrors(err)
            res.status(400).json({errors})
            // res.status(400).json('error, user not created')
        })  
    }

}
module.exports = new AuthController();
