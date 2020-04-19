const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();

// Load routes
const academicPerformance = require('./routes/academicPerformance');
const leave = require('./routes/leave');
const annexure_1 = require('./routes/annexure-1');
const annexure_2 = require('./routes/annexure-2');
const annexure_3 = require('./routes/annexure-3');
const profile = require('./routes/profile');
const users = require('./routes/users');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Load helpers
const {
    if_eq
} = require('./helpers/hbs');

// Passport config
require('./config/passport')(passport);

// DB config
const db = require('./config/database');

//connect to mongoose
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
})
    .then(() => { console.log('Connected to MongoDB...') })
    .catch(err => console.log(err));

//load leave model
require('./models/Leave');
const Leave = mongoose.model('leaves');

//handlebars middleware
app.engine('handlebars', exphbs({
    helpers: {
        if_eq: if_eq
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//index route
app.get('/', (req, res) => {
    var title = "Welcome"
    res.render('index', {
        title: title
    });
});

// Use routes
app.use('/academicPerformance', academicPerformance);
app.use('/leave', leave);
app.use('/annexure-1', annexure_1);
app.use('/annexure-2', annexure_2);
app.use('/annexure-3', annexure_3);
app.use('/profile', profile);
app.use('/users', users);

port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));