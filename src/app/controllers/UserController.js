const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToOject } = require('../../util/mongoose');
const { findById } = require('../models/user');
const user_model = require('../models/user');
const Address_model = require('../models/Address');
const multer = require('multer');

class UserController {

    //[GET] /user/:id
    index(req, res, next) {
        const user = user_model.findById({ _id: req.params.id })
            .then((user) => {
                if (user.fullName) {
                    res.render('user/index', {
                        user: mongooseToObject(user)
                    });
                } else {
                    res.render('user/input', {
                        user: mongooseToObject(user)
                    });
                }
            })
            .catch(next);
    }

    //[GET] /user/address/:id
    address(req, res, next) {
        Promise.all([
            Address_model.find({ idUser: req.params.id }),
            user_model.findById({ _id: req.params.id })
        ])
            .then(([address, user]) => {
                res.render('address/addressUser', {
                    address: multipleMongooseToOject(address),
                    user: mongooseToObject(user)
                });
            })
            .catch(next);
    }

    //[GET] /user/address/create
    createAddress(req, res, next) {
        res.render('address/create')
    }

    // [GET] /user/address/edit/:id
    edit(req, res, next) {
        Address_model.findById({ _id: req.params.id })
            .then((address) => {
                res.render('address/edit', {
                    address: mongooseToObject(address)
                })
            })
            .catch(next);
    }

    //[POST] /user/address/create/:id
    storeAddress(req, res, next) {
        // console.log(req.body)
        const address = Address_model({
            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            district: req.body.district,
            wards: req.body.wards,
            address: req.body.address,
            idUser: req.params.id,
        })
        address
            .save()
            .then((address) => {
                res.redirect('../../../user/address/' + address.idUser)
            })
            .catch(next);
    }

    //[POST] /input/:id
    async input(req, res, next) {
        const user = await user_model.updateOne({ _id: req.params.id }, {
            fullName: req.body.fullName,
            email: req.body.email,
            sex: req.body.sex
        })
            .then(() => res.redirect('../' + req.params.id + ''))
            .catch((err) => {
                res.status(400).json(err)
            })
    }

    //[GET] /avatar/:id
    async avatar(req, res, next) {
        const user = user_model.findById({ _id: req.params.id })
            .then((user) => {
                res.render('user/avatar', {
                    user: mongooseToObject(user)
                });
            })
            .catch(next);
    }

    //[POST] /user/avatar/:id
    async updateavatar(req, res, next) {
        const user = await user_model.updateOne({ _id: req.params.id }, {
            avatar: req.file.filename
        })
            .then(() => res.redirect('../' + req.params.id + ''))
            .catch((err) => {
                res.status(400).json(err)
            })
    }

    //[POST] /user/address/update/:id
    async update(req, res, next) {
        const Address = await Address_model.updateOne({ _id: req.params.id }, {
            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            district: req.body.district,
            wards: req.body.wards,
            address: req.body.address,
        })
            .then((address) => res.redirect('../' + req.body.idUser))
            .catch((err) => {
                res.status(400).json(err)
            })
    }

    //[POST] /user/address/default/:id
    async default(req, res, next) {
        const Address = await user_model.updateOne({ _id: req.params.idUser }, {
            default: req.params.id,
        })
            .then((address) => 
                res.redirect('../../' + req.params.idUser))
            .catch((err) => {
                res.status(400).json(err)
            })
    }
}
module.exports = new UserController();
