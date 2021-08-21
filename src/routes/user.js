const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/:id', userController.index);
router.get('/avatar/:id', userController.avatar);
router.get('/address/create', userController.createAddress);
router.get('/address/:id', userController.address);
router.get('/address/edit/:id', userController.edit);
router.get('/address/default/:id/:idUser', userController.default);

router.post('/address/update/:id', userController.update);
router.post('/address/create/:id', userController.storeAddress);

router.post('/input/:id', userController.input);
router.post('/avatar/:id', userController.updateavatar);

module.exports = router;
