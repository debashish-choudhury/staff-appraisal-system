const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const { ensureAuthenticated } = require('./helpers/auth');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
// Load routes
const academicPerformance = require('./routes/academicPerformance');
const leave = require('./routes/leave');
const annexure_1 = require('./routes/annexure-1');
const annexure_2 = require('./routes/annexure-2');
const annexure_3 = require('./routes/annexure-3');
const profile = require('./routes/profile');
const users = require('./routes/users');
const reset = require('./routes/reset');

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

mongoose.set('useCreateIndex', true);
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
    res.locals.year = academicYear || autoYear || null;
    next();
});

// Require academic year model
require('./models/AcademicYear');
const AcademicYear = mongoose.model('academic_year');
var autoYear;
//index route
app.get('/', (req, res) => {
    if (req.user) {
        AcademicYear.find({ user: req.user.id })
            .then(result => {
                autoYear = result[0].academic_year;
                res.render('index', {
                    result: result
                });
            })
            .catch(err => {
                if (err) {
                    res.render('index');
                }
            })
    } else {
        res.render('index');
    }
});

// Edit get router request
app.get('/edit/:id', ensureAuthenticated, (req, res) => {
    AcademicYear.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/');
            } else {
                res.render('index', { editResult: result });
            }
        })
        .catch(() => {
            req.flash('error_msg', 'There was an error while edit the academic year. Please try again after some time');
            res.redirect('back');
        })
});

// Academic year route
var academicYear;
app.post('/', (req, res) => {
    academicYear = req.body.academic_year;
    const academicYearDetails = {
        academic_year: req.body.academic_year,
        user: req.user.id
    }
    new AcademicYear(academicYearDetails)
        .save().then(result => {
            if (!result) {
                req.flash('error_msg', 'Academic year not selected');
                res.redirect('/');
            } else {
                req.flash('success_msg', 'Academic year selected');
                res.redirect('/academicPerformance/teachingLoad');
            }
        })
        .catch(() => {
            req.flash('error_msg', 'Error while saving academic year. Please resubmit the academic year.')
            res.redirect('back');
        })
});

// PUT Request for academic year
app.put('/:id', (req, res) => {
    academicYear = req.body.academic_year;
    AcademicYear.findOne({ _id: req.params.id })
        .then(result => {
            result.academic_year = req.body.academic_year
            result.save()
                .then(result => {
                    req.flash('success_msg', 'Data updated successfully');
                    res.redirect('/academicPerformance/teachingLoad');
                })
                .catch(() => {
                    req.flash('error_msg', 'Error while updating academiic year. Please try again.');
                    res.redirect('back');
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Error while finding your academiic year. Please try again.');
            res.redirect('back');
        })
});

// Use routes
app.use('/academicPerformance', academicPerformance);
app.use('/leave', leave);
app.use('/annexure-1', annexure_1);
app.use('/annexure-2', annexure_2);
app.use('/annexure-3', annexure_3);
app.use('/profile', profile);
app.use('/users', users);
app.use('/forgot', reset);

port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));