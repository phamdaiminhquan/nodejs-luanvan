const Food = require('../models/Food');
const { mongooseToObject } = require('../../util/mongoose');



class CartController {

    //[GET] /cart
    index(req, res, next) {
        res.render('cart/index');
    }
}

module.exports = new CartController();
