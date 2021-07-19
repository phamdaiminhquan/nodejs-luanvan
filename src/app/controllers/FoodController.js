const Food = require('../models/Food');
const { mongooseToObject } = require('../../util/mongoose');

class FoodController {

    // [GET] /food
    async index(req, res, next) {
        Food.find({})
            .then((food) => {
                food = food.map(food => food.toObject())
                res.render('home', { food })
            })
            .catch(next);
    }

    // [POST] /food/store
    store(req, res, next) {
        const formData = req.body;
        const food = new Food(formData);
        food.save();

        res.render('food/store')
    }

    // [GET] /food/:slug
    show(req, res, next) {
        Food.findOne({ slug: req.params.slug })
            .then(food => res.render('food/detail', { 
                food: mongooseToObject(food) 
            }))
            .catch(next);
    }
    
    // [GET] /food/:id/edit
    edit(req, res, next) {
        Food.findById({_id: req.params.id})
            .then((food)=>{
                res.render('food/edit',{
                    food: mongooseToObject(food) 
                })
            })
            .catch(next);
    }

    // [PUT] /food/:id
    update(req, res, next) {
        Food.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('../admin/foodlist'))
            .catch(next);
    }

    // [DELETE] /food/:id
    delete(req, res, next) {
        Food.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new FoodController();
