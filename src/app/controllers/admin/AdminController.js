const Food = require('../../models/Food');
const { mongooseToObject } = require('../../../util/mongoose');

class AdminController {
    // [GET] /admin
    index(req, res, next) {
        res.render('admin/admin');
    }

    // [GET] /admin/create
    create(req, res, next) {
        res.render('food/create');
    }

    // [GET] /admin/foodlist
    show(req, res, next) {
        Food.find({})
            .then((food) => {
                food = food.map(food => food.toObject())
                res.render('food/foodlist', { food })
            })
            .catch(next);
    }
}

module.exports = new AdminController();