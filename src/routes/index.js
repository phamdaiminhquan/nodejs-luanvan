const newsRouter = require('./news');
const foodRouter = require('./food');
const adminRouter = require('./admin/admin');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/food', foodRouter);
    app.use('/admin', adminRouter);
}

module.exports = route;
