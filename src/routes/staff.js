const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.get('/', orderController.neworder);
router.get('/order-confirmed', orderController.confirmed);
router.post('/confirm/:id', orderController.confirm);

module.exports = router;
