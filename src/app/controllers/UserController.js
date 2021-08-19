const { mongooseToObject } = require('../../util/mongoose');
const { findById } = require('../models/user');
const user_model = require('../models/user')
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
}
module.exports = new UserController();
