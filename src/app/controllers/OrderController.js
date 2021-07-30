const Order_model = require('../models/Order');
const Orderdetails_model = require('../models/Orderdetails');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToOject } = require('../../util/mongoose');



class OrderController {

    //[GET] /staff/ 
    neworder(req, res, next) {
        Order_model.find({ orderstatus: null })
            .then((order) => {
                res.render('order/index', {
                    order: multipleMongooseToOject(order)
                })
            })
            .catch(next);
    }

    //[GET] /staff/confirmed 
    confirmed(req, res, next) {
        Order_model.find({ orderstatus: 1 })
            .then((order) => {
                res.render('order/index', {
                    order: multipleMongooseToOject(order)
                })
            })
            .catch(next);
    }

    //[GET] /staff/confirm/:id
    confirm(req, res, next) {
        const order = Order_model.updateOne({ _id: req.params.id }, {
            orderstatus: req.body.orderstatus
        })
            .then(() => res.redirect('/staff/order-confirmed'))
            .catch(next);
    }
}


module.exports = new OrderController();
