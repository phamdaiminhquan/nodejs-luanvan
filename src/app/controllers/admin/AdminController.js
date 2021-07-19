const Food = require('../../models/Food');
const Foodtype = require('../../models/Foodtype');
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

    showfoodtype(req, res, next) {
        Foodtype.find({})
            .then((foodtype) => {
                foodtype = foodtype.map(foodtype => foodtype.toObject())
                res.render('foodtype/foodtypelist', { foodtype })
            })
            .catch(next);
    }
    
    createfoodtype(req, res, next) {
        res.render("foodtype/createtype")
    }


}

module.exports = new AdminController();