const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const route = require('./routes');
const router = require('./routes/news');
const db = require('./config/db');

app.use(express.static(path.join(__dirname, 'public')))

// Connect to DB
db.connect();

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
