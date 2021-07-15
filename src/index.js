const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const port = 3300;
const route = require('./routes');
const router = require('./routes/news');
const db = require('./config/db');
const methodOverride = require('method-override'); 

app.use(express.static(path.join(__dirname, 'public')))

// Connect to DB
db.connect();

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

route(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
