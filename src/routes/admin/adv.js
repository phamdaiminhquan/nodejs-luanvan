const express = require('express');
const router = express.Router();

const advController = require('../../app/controllers/AdvController');

// [GET] /admin/adv
router.get('/', advController.index);
router.get('/create', advController.create);
router.post('/store', advController.store);
router.get('/:id/edit', advController.edit);
router.put('/:id', advController.update);
router.delete('/:id', advController.delete);


module.exports = router;