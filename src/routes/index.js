const foodRouter = require('./food');
const adminRouter = require('./admin/admin');
const authRouter = require('./auth');

function route(app) {
    
    
    app.get('/', (req, res) => {
        res.render('home');
    });
    app.use('/food', foodRouter);
    app.use('/admin', adminRouter);
    app.use(authRouter);
}

module.exports = route;
