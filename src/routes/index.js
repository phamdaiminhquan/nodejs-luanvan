const adminRouter = require('./admin/admin');
const foodRouter = require('./food');
const authRouter = require('./auth');
const cartRouter = require('./cart');
const newsRouter = require('./news');
function route(app) {
    app.use(cartRouter);
    app.use(authRouter);
    app.use('/', foodRouter);
    app.use('/news', newsRouter);
    app.use('/admin', adminRouter);
}
module.exports = route;
