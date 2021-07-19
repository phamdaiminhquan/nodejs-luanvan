const Adv = require('../models/Adv');
const { mongooseToObject } = require('../../util/mongoose');

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
    create(req, res) {
        res.render('adv/create');
    }

    // [POST] /adv/store
    store(req, res, next) {
        const formData = req.body;
        const adv = new Adv(formData);
        adv.save();

        res.render('adv/store')
    }

    // [GET] /adv/:id/edit
    edit(req, res, next) {
        Adv.findById({ _id: req.params.id })
            .then((adv) => {
                res.render('adv/edit', {
                    adv: mongooseToObject(adv)
                })
            })
            .catch(next);
    }

    // [PUT] /adv/:id
    update(req, res, next) {
        Adv.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('../adv'))
            .catch(next);
    }

    // [DELETE] /adv/:id
    delete(req, res, next) {
        Adv.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new AdvController();
