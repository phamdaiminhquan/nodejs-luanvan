const Food = require('../models/Food');
const adv_model = require('../models/Adv');
const { multipleMongooseToOject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const multer = require('multer');



class FoodController {
    //[GET] /food
    index(req, res, next) {

        Promise.all([
            Food.find({}),
            adv_model.find({})
        ])
        .then(([food, adv]) => {
            res.render('home', { 
                food: multipleMongooseToOject(food),
                adv: multipleMongooseToOject(adv)
            })
        })
        .catch(next);
    }

    show(req, res, next) {
        Food.find({})
            .then((food) => {
                food = food.map(food => food.toObject())
                res.render('food/foodlist', {
                    food,
                    layout: 'admain'
                })

            })
            .catch(next);
    }

    store(req, res, next) {
        const food = Food({
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
            price: req.body.price,
        })
        food.save({})
            .then(() => res.render('food/store', { layout: 'admain' }))
            .catch(next);
    }

    create(req, res, next) {
        res.render('food/create', { layout: 'admain' });
    }
    // [GET] /food/:slug


    // [GET] /food/:id/edit
    edit(req, res, next) {
        Food.findById({ _id: req.params.id })
            .then((food) => {
                res.render('food/edit', { food: mongooseToObject(food), layout: 'admain' })
            })
            .catch(next);
    }

    // [PUT] /food/:id
    async update(req, res, next) {
        const food = await Food.updateOne({ _id: req.params.id }, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file.filename,
        })
            .then((food) => {
                res.json(food)
            })
            .catch((err) => {
                res.status(400).json(err)
            })

    }

    // [DELETE] /food/:id
    delete(req, res, next) {
        Food.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new FoodController();
