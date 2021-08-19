const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/:id', userController.index);
router.post('/input/:id', userController.input);
router.get('/avatar/:id', userController.avatar);
router.post('/avatar/:id', userController.updateavatar);

module.exports = router;
