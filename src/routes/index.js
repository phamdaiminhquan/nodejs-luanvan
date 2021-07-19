const newsRouter = require('./news');
const foodRouter = require('./food');
const adminRouter = require('./admin/admin');
const authRouter = require('./auth');
const foodtypeRouter = require('./foodtype');

function route(app) {
    
    
    app.get('/', (req, res) => {
        res.render('home');
    });
    app.use('/foodtype', foodtypeRouter);
    app.use('/news', newsRouter);
    app.use('/food', foodRouter);
    app.use('/admin', adminRouter);
    app.use(authRouter);
    
}

module.exports = route;
