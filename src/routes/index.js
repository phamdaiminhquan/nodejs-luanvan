const adminRouter = require('./admin/admin');
const staffRouter = require('./staff');
const foodRouter = require('./food');
const authRouter = require('./auth');
const cartRouter = require('./cart');

function route(app) {
    
    app.use(cartRouter);
    app.use(authRouter);
    
    app.use('/', foodRouter);
    app.use('/admin', adminRouter);
    app.use('/staff', staffRouter);
    
}

module.exports = route;
