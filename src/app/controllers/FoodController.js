const Food = require('../models/Food');
const foodtype_model = require('../models/Foodtype');
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

    //[GET] /admin/foodlist
    async show(req, res, next) {
        const food = await Food.find({}).populate('foodtypeid')
            .then((food) => {
                food = food.map(food => food.toObject())
                res.render('food/foodlist', {
                    food,
                    layout: 'admain'
                })
            })
            .catch(next);
    }

    //[POST] /admin/foodlist/store
    store(req, res, next) {
        const food = Food({
            name: req.body.name,
            foodtypeid: req.body.foodtypeid,
            description: req.body.description,
            image: req.file.filename,
            price: req.body.price,
        })
        food.save({})
            .then(() => res.render('food/store', { layout: 'admain' }))
            .catch(next);
    }

    //[GET] /admin/foodlist/create
    create(req, res, next) {
        foodtype_model.find({})
            .then((foodtype) => 
                res.render('food/create', {
                    foodtype: multipleMongooseToOject(foodtype),
                    layout: 'admain'
                })
            )
            .catch(next);
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
            .then(() => res.redirect('../foodlist'))
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
