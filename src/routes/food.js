const express = require('express');
const router = express.Router();

const foodController = require('../app/controllers/FoodController');

router.get('/', foodController.index);
router.get('/create', foodController.create);
router.get('/:slug', foodController.show);

module.exports = router;
