const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

router.post('/store', newsController.store);
router.put('/:id', newsController.update);
router.get('/:id/edit', newsController.edit);
router.delete('/:id', newsController.delete);

module.exports = router;
