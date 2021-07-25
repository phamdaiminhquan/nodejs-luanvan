const Adv = require('../models/Adv');
const news_models = require('../models/News');
const { mongooseToOject } = require('../../util/mongoose');
const { multipleMongooseToOject } = require('../../util/mongoose');
const multer = require('multer');

class AdvController {

    // [GET] /adv
    index(req, res, next) {
        Adv.find({})
            .then((adv) => {
                adv = adv.map(adv => adv.toObject())
                res.render('adv/advlist', { adv })
            })
            .catch(next);
    }

    // [GET] /adv/create
    create(req, res, next) {
        news_models.find({})
            .then((news) => {
                res.render('adv/create', {
                    news: multipleMongooseToOject(news),
                    layout: 'admain'
                });
            })
            .catch(next);
    }

    // [POST] /adv/store
    store(req, res, next) {
        const adv = Adv({
            image: req.file.filename,
            newsid: req.body.newsid,
            alt: req.body.alt,
        })
        adv.save({})
            .then(() => res.render('adv/store', { layout: 'admain' }))
            .catch(next);
    }

    // [GET] /adv/:id/edit
    edit(req, res, next) {
        Promise.all([
            news_models.find({}),
            Adv.findById({ _id: req.params.id })
        ])
            .then(([news, adv]) => {
                res.render('adv/edit', {
                    news: multipleMongooseToOject(news),
                    adv: mongooseToOject(adv),
                    layout: 'admain'
                })
            })
    }

    // [PUT] /adv/:id
    async update(req, res, next) {
        const adv = await Adv.updateOne({ _id: req.params.id }, {
            image: req.file.filename,
            newsid: req.body.newsid,
            alt: req.body.alt,
        })
            .then(() => res.redirect('../adv'))
            .catch((err) => {
                res.status(400).json(err)
            })
    }

    // [DELETE] /adv/:id
    delete(req, res, next) {
        Adv.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new AdvController();
