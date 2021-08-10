const adminRouter = require('./admin/admin');
const staffRouter = require('./staff');
const foodRouter = require('./food');
const authRouter = require('./auth');
const cartRouter = require('./cart');
const orderRouter = require('./order');

function route(app) {
    
    app.use(cartRouter);
    app.use(authRouter);
    
    app.use('/', foodRouter);
    app.use('/admin', adminRouter);
    app.use('/staff', staffRouter);
    app.use('/order', orderRouter);
    
}

module.exports = route;
