const express = require('express');
const router = express.Router();

const foodController = require('../app/controllers/FoodController');


router.get('/', foodController.index);

module.exports = router;
