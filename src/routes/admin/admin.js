const express = require('express');
const router = express.Router();
const advRouter = require('./adv');

const adminController = require('../../app/controllers/admin/AdminController');
const advController = require('../../app/controllers/AdvController');

// [GET] /admin
router.get('/', adminController.index);
router.get('/create', adminController.create);
router.get('/foodlist', adminController.show);
router.use('/adv', advRouter);



module.exports = router;