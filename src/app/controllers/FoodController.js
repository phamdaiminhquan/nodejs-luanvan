const Food = require('../models/Food');
const { mongooseToObject } = require('../../util/mongoose');

class FoodController {
    // [GET] /food/:slug
    index(req, res, next) {
        Food.find({})
            .then((food) => {
                food = food.map(food => food.toObject())
                res.render('home', { food })
            })
            .catch(next);
    }
    create(req, res, next) {
        res.send('food create')
    }
    show(req, res, next) {
        Food.findOne({ slug: req.params.slug })
            .then(food =>
                res.render('food/detail', { food: mongooseToObject(food) })
            )
            .catch(next);
    }
}

module.exports = new FoodController();
