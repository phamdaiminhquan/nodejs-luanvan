const Food = require('../models/Food');
const { mongooseToObject } = require('../../util/mongoose');

class FoodController {

    show(req, res, next) {
        Food.find({})
            .then((food) => {
                food = food.map(food => food.toObject())
                res.render('food/foodlist', { food })
            })
            .catch(next);
    }

    store(req, res, next) {
        const formData = req.body;
        const food = new Food(formData);
        food.save();

        res.render('food/store')
    }
    create(req, res, next) {
        res.render('food/create');
    }

    // [GET] /food/:slug
   
    
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
            .then(() => res.redirect('/admin/foodlist'))
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
