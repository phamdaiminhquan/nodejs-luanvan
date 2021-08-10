const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.get('/', orderController.neworder);
router.get('/order-confirmed', orderController.confirmed);
router.get('/order-accomplished', orderController.accomplished);

router.get('/orderdetails/:id', orderController.orderdetails);
router.get('/orderdetails-confirmed/:id', orderController.orderdetailsconfirmed);
router.get('/orderdetails-accomplished/:id', orderController.orderdetailsaccomplished);

router.post('/confirm/:id', orderController.confirm);
router.post('/complete/:id', orderController.complete);
router.delete('/cancel/:id', orderController.cancel);

module.exports = router;
