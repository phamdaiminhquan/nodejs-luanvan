const express = require('express');
const router = express.Router();

const foodController = require('../app/controllers/FoodController');


router.get('/', foodController.index);
router.get('/food/:slug', foodController.detail);

module.exports = router;
