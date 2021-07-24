const express = require('express');
const router = express.Router();

const advRouter = require('./adv');
const newsRouter = require('./news');
const foodRouter = require('./food');
const foodtypeRouter = require('./foodtype');
const upload = require('../../app/middlewares/multer')
const adminController = require('../../app/controllers/admin/AdminController');

// [GET] /admin
router.get('/', adminController.index);

router.use('/adv' , advRouter);
router.use('/news', newsRouter);
router.use('/foodlist' , upload.single('image'),foodRouter);
router.use('/foodtypelist',foodtypeRouter);


module.exports = router;