const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.get('/cart', cartController.index);

module.exports = router;
