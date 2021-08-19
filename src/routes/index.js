const adminRouter = require('./admin/admin');
const staffRouter = require('./staff');
const foodRouter = require('./food');
const authRouter = require('./auth');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const userRouter = require('./user');
const upload = require('../app/middlewares/multer')
const { checkUser } = require('../app/middlewares/authMiddleware')
const { requireAuth } = require('../app/middlewares/authMiddleware')
function route(app) {
    app.use('*', checkUser)
    app.use(cartRouter);
    app.use(authRouter);
    
    app.use('/', foodRouter);
    app.use('/admin', adminRouter);
    app.use('/staff', staffRouter);
    app.use('/order', orderRouter);
    app.use('/user',requireAuth , upload.single('image'), userRouter);
}

module.exports = route;
