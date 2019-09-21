const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//connect to mongoose
mongoose.connect('mongodb://localhost/staff-db', {
    useNewUrlParser: true
})
    .then(() => { console.log('Connected to MongoDB...') })
    .catch(err => console.log(err));

//load leave model
require('./models/Leave');
const Leave = mongoose.model('leaves');

//load Staff info model
require('./models/Staffinfo');
const Staffinfo = mongoose.model('staffinfo');

//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

// staff info
app.get('/staffinfo', (req, res) => {
    res.render('staffInfo');
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
            res.redirect('/showleaves');
        });
});

//process staff form
app.post('/staff-info', (req, res) => {
    // add preleave data into db
    const StaffRecord = {
        faculty_name: req.body.faculty_name,
        designation: req.body.designation,
        department: req.body.department,
        qualification: req.body.qualification,
        teaching_exp: req.body.teaching_exp,
        appointment: req.body.appointment,
        date_of_join: req.body.date_of_join,
        DOB: req.body.DOB,
        salary: req.body.salary
    }
    new Staffinfo(StaffRecord)
        .save()
        .then(Staffinfos => {
            res.send('ok');
        });
});


port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));