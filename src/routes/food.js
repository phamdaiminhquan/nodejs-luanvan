const express = require('express');
const router = express.Router();

const foodController = require('../app/controllers/FoodController');

router.get('/', foodController.index);
router.post('/store', foodController.store);
router.get('/:slug', foodController.show);
router.get('/:id/edit', foodController.edit);
router.put('/:id', foodController.update);
router.delete('/:id', foodController.delete);

module.exports = router;
