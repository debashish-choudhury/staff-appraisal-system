const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Load routes
const academicPerformance = require('./routes/academicPerformance');
const profile = require('./routes/profile');
const annexure_1 = require('./routes/annexure-1');


//connect to mongoose
mongoose.connect('mongodb://localhost/staff-db', {
    useNewUrlParser: true
})
    .then(() => { console.log('Connected to MongoDB...') })
    .catch(err => console.log(err));

//load leave model
require('./models/Leave');
const Leave = mongoose.model('leaves');

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// method override middleware
app.use(methodOverride('_method'))

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
            res.redirect('/leaveForm');
        });
});

// Use routes
app.use('/academicPerformance', academicPerformance);
app.use('/profile', profile);
app.use('/annexure-1', annexure_1)

port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));