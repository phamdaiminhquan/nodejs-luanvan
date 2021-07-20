const express = require('express');
const router = express.Router();

const foodtypeController = require('../../app/controllers/FoodtypeController');


router.get('/', foodtypeController.showfoodtype);
router.get('/createtype', foodtypeController.createtype);
router.post('/store', foodtypeController.store);
router.put('/:id', foodtypeController.update);
router.get('/:id/edit', foodtypeController.edit);
router.delete('/:id', foodtypeController.delete);



module.exports = router;