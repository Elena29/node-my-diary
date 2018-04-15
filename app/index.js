const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config()
// Load models
require('./models/User');
require('./models/Story');

//Passport config
require('./config/passport')(passport);

//Load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');

const {truncate, stripTags, formatDate, select, editIcon} = require('./helpers/hbs');

//Map global promises
mongoose.Promise = global.Promise;

// Connect to mongoose
const db = require('./config/database');
mongoose.connect(db.mongoURI)
    .then(() => {
        console.log('MongoDb Connected... ')
    })
    .catch(err => console.log(err));

// Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({
    helpers: {
      truncate, stripTags, formatDate, select, editIcon
    },
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// Cookie parser
app.use(cookieParser());

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


// Global variables
app.use((req, res, next) => {
   res.locals.user = req.user || null;
   next();
});


// Set static folders
app.use(express.static(path.join(__dirname, 'public')));

//Use routes
app.use('/auth', auth);
app.use('/', index);
app.use('/stories', stories);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});