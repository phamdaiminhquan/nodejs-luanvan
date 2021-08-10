const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.get('/address', orderController.address);
router.get('/tracking/:id', orderController.tracking);

module.exports = router;
