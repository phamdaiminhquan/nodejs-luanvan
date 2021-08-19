const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const multer  = require('multer');
const app = express();
const path = require('path');
const port = 3300;

app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// Connect to DB
db.connect();

app.engine('hbs', 
    handlebars({
        extname: '.hbs',
        // defaultLayout: 'user.hbs',
        helpers: require('./app/helpers/handlebars.js'),
        runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
        },
    })
)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
