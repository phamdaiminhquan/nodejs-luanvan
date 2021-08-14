const Order_model = require('../models/Order');
const Orderdetails_model = require('../models/Orderdetails');
const Ordercancel_model = require('../models/Ordercancel');
const Address_model = require('../models/Address');
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToOject } = require('../../util/mongoose');



class OrderController {

    //[GET] /staff/ 
    neworder(req, res, next) {
        Order_model.find({ orderstatus: null })
            .then((order) => {
                res.render('order/new', {
                    order: multipleMongooseToOject(order)
                })
            })
            .catch(next);
    }

    //[GET] /staff/confirmed 
    confirmed(req, res, next) {
        Order_model.find({ orderstatus: 1 })
            .then((order) => {
                res.render('order/confirmed', {
                    order: multipleMongooseToOject(order)
                })
            })
            .catch(next);
    }

    //[GET] /staff/accomplished 
    accomplished(req, res, next) {
        Order_model.find({ $or: [{ orderstatus: 2 }, { orderstatus: 3 }] })
            .then((order) => {
                res.render('order/accomplished', {
                    order: multipleMongooseToOject(order)
                })
            })
            .catch(next);
    }

    //[POST] /staff/confirm/:id
    confirm(req, res, next) {
        const order = Order_model.updateOne({ _id: req.params.id }, {
            orderstatus: req.body.orderstatus
        })
            .then(() => res.redirect('/staff/order-confirmed'))
            .catch(next);
    }

    //[POST] /staff/complete/:id
    complete(req, res, next) {
        const order = Order_model.updateOne({ _id: req.params.id }, {
            orderstatus: req.body.orderstatus
        })
            .then(() => res.redirect('/staff/order-accomplished'))
            .catch(next);
    }

    //[POST] /staff/cancel/:id
    cancel(req, res, next) {
        const ordercancel = Ordercancel_model({
            orderid: req.params.id,
            reason: req.body.reason,
        })
        ordercancel.save({});

        const order = Order_model.updateOne({ _id: req.params.id }, {
            orderstatus: req.body.orderstatus
        })
            .then(() => res.redirect('/staff/order-accomplished'))
            .catch(next);
    }

    //[GET] /staff/orderdetails/:id
    async orderdetails(req, res, next) {
        const oder = Order_model.findById({ _id: req.params.id });
        oder.then(value => {
            const idAddress = value.idAddress;
            Promise.all([
                Order_model.findById({ _id: req.params.id }),
                Orderdetails_model.find({ orderid: req.params.id }).populate('foodid'),
                Address_model.findOne({ _id: idAddress })
            ])
                .then(([order, orderdetails, address]) => {
                    res.render('order/order-details', {
                        order: mongooseToObject(order),
                        orderdetails: multipleMongooseToOject(orderdetails),
                        address: mongooseToObject(address)
                    })
                })
                .catch(next);
        })
    }

    //[GET] /staff/orderdetails-confirmed/:id
    async orderdetailsconfirmed(req, res, next) {
        const oder = Order_model.findById({ _id: req.params.id });
        oder.then(value => {
            const idAddress = value.idAddress;
            Promise.all([
                Order_model.findById({ _id: req.params.id }),
                Orderdetails_model.find({ orderid: req.params.id }).populate('foodid'),
                Address_model.findOne({ _id: idAddress })
            ])
                .then(([order, orderdetails, address]) => {
                    res.render('order/order-details-confirmed', {
                        order: mongooseToObject(order),
                        orderdetails: multipleMongooseToOject(orderdetails),
                        address: mongooseToObject(address)
                    })
                })
                .catch(next);
        })
    }

    //[GET] /staff/orderdetails-confirmed/:id
    async orderdetailsaccomplished(req, res, next) {
        const oder = Order_model.findById({ _id: req.params.id });
        oder.then(value => {
            const idAddress = value.idAddress;
            Promise.all([
                Order_model.findById({ _id: req.params.id }),
                Orderdetails_model.find({ orderid: req.params.id }).populate('foodid'),
                Ordercancel_model.findOne({ orderid: req.params.id }),
                Address_model.findOne({ _id: idAddress })
            ])
                .then(([order, orderdetails, ordercancel, address]) => {
                    res.render('order/order-details-accomplished', {
                        order: mongooseToObject(order),
                        orderdetails: multipleMongooseToOject(orderdetails),
                        ordercancel: mongooseToObject(ordercancel),
                        address: mongooseToObject(address)
                    })
                })
                .catch(next);
        })
    }

    //[GET] /order/tracking/:id
    async tracking(req, res, next) {
        const oder = Order_model.findById({ _id: req.params.id });
        oder.then(value => {
            const idAddress = value.idAddress;
            Promise.all([
                Order_model.findById({ _id: req.params.id }),
                Orderdetails_model.find({ orderid: req.params.id }).populate('foodid'),
                Address_model.findOne({ _id: idAddress })
            ])
                .then(([order, orderdetails, address]) => {
                    res.render('order/tracking', {
                        order: mongooseToObject(order),
                        orderdetails: multipleMongooseToOject(orderdetails),
                        address: mongooseToObject(address)
                    })
                })
                .catch(next);
        })
    }

    //[GET] /address
    async address(req, res, next) {
        res.render('order/order', {
        })
    }

    //[GET] /payment
    async payment(req, res, next) {
        res.render('order/payment', {
        })
    }

    //[GET] /completion
    async completion(req, res, next) {
        res.render('order/completion', {
        })
    }

    //[POST] /order
    async order(req, res, next) {
        // lưu lại địa chỉ
        const address = Address_model({
            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            district: req.body.district,
            wards: req.body.wards,
            address: req.body.address
        })
        address.save()

        // lưu lại đơn hàng
        const order = Order_model({
            idAddress: address._id,
            totalmoney: req.body.totalOrderMoney,
            payment: req.body.paymentType
        })

        /// lưu lại chi tiết đơn hàng
        // Cắt để lấy từng sản phẩm trong giỏ
        var orderAmount = 0;
        var String = req.body.cartString;
        var chuoicat = '';
        var duoi = String.length;
        for (var i = String.length; i >= 0; i--) {
            if (String[i] == '/') {
                chuoicat = String.slice(i + 1, duoi);
                //Cắt để lấy id và số lượng
                var idFoodInCart;
                var amount;
                var duoi2 = chuoicat.length;
                for (var j = chuoicat.length; j >= 0; j--) {
                    if (chuoicat[j] == '-') {
                        amount = chuoicat.slice(j + 1, duoi2);
                        idFoodInCart = chuoicat.slice(0, j);
                        const orderdetails = Orderdetails_model({
                            foodid: idFoodInCart,
                            orderid: order._id,
                            amount: amount,
                        })
                        orderdetails.save({})
                        orderAmount++;
                    }
                }
                duoi = i;
            }
        }
        order.amount = orderAmount
        order.save()
            .then(() => res.redirect('/order/tracking/' + order._id))
            .catch(next);
    }
}


module.exports = new OrderController();
