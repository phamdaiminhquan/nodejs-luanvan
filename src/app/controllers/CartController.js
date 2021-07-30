const Food = require('../models/Food');
const Order_model = require('../models/Order');
const Orderdetails_model = require('../models/Orderdetails');
const { mongooseToObject } = require('../../util/mongoose');



class CartController {

    //[GET] /cart
    index(req, res, next) {
        res.render('cart/index');
    }

    //[POST] /cart/:id
    create(req, res, next) {
        // tạo đơn hàng và lưu lại tổng tiền
        const order = Order_model({
            totalmoney: req.body.totalmoney,
        })
        order.save({})

        // Cắt để lấy từng sản phẩm trong giỏ
        var String = req.query.q;
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
                        amount = chuoicat.slice(j+1, duoi2);
                        idFoodInCart = chuoicat.slice(0,j);
                        const orderdetails = Orderdetails_model({
                            foodid: idFoodInCart,
                            orderid: order._id,
                            amount: amount,
                        })
                        orderdetails.save({})
                            .then(() => res.redirect('/'))
                            .catch(next);
                    }
                }
                duoi = i;
            }
        }
    }
}

module.exports = new CartController();
