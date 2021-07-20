const express = require('express');
const router = express.Router();

const foodController = require('../../app/controllers/FoodController');


router.get('/food', foodController.index);
router.get('/', foodController.show);
router.get('/create', foodController.create);
router.post('/store', foodController.store);
router.put('/:id', foodController.update);
router.get('/:id/edit', foodController.edit);
router.delete('/:id', foodController.delete);

module.exports = router;
