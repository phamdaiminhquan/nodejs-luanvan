const newsRouter = require('./news');
const foodRouter = require('./food');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/food', foodRouter);
}

module.exports = route;
