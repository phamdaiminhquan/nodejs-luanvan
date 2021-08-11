const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.get('/address', orderController.address);
router.get('/payment', orderController.payment);
router.get('/completion', orderController.completion);
router.get('/tracking/:id', orderController.tracking);

module.exports = router;
