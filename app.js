const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Load routes
const academicPerformance = require('./routes/academicPerformance');
const profile = require('./routes/profile');
const annexure_1 = require('./routes/annexure-1');
const annexure_2 = require('./routes/annexure-2');
const annexure_3 = require('./routes/annexure-3');
const users = require('./routes/users');

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

//about page route
app.get('/about', (req, res) => {
    res.render('about');
});

//show leave records
app.get('/showleaves', (req, res) => {
    res.send('ok');
});

//leave form route
app.get('/leaveform', (req, res) => {
    res.render('leaveForm');
});

//process leave form
app.post('/leave-form', (req, res) => {
    // add preleave data into db
    const LeaveRecord = {
        pre_casual_leave: req.body.pre_casual_leave,
        pre_outdoor_leave: req.body.pre_outdoor_leave,
        pre_medical_leave: req.body.pre_medical_leave,
        pre_special_leave: req.body.pre_special_leave,
        post_casual_leave: req.body.post_casual_leave,
        post_outdoor_leave: req.body.post_outdoor_leave,
        post_medical_leave: req.body.post_medical_leave,
        post_special_leave: req.body.post_special_leave
    }
    new Leave(LeaveRecord)
        .save()
        .then(leaves => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/timeTable');
        });
});

// Use routes
app.use('/academicPerformance', academicPerformance);
app.use('/profile', profile);
app.use('/annexure-1', annexure_1);
app.use('/annexure-2', annexure_2);
app.use('/annexure-3', annexure_3);
app.use('/users', users);

port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));