const express = require('express');
const router = express.Router();
const newsRouter = require('./news');
const foodRouter = require('./food');
const foodtypeRouter = require('./foodtype');
const adminController = require('../../app/controllers/admin/AdminController');

// [GET] /admin
router.get('/', adminController.index);
router.use('/news', newsRouter);
router.use('/foodlist',foodRouter);
router.use('/foodtypelist',foodtypeRouter);


module.exports = router;