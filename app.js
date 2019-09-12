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

//load preleave model
require('./models/preLeave');
const PreLeave = mongoose.model('preleaves');

//load postleave model
require('./models/postLeave');
const PostLeave = mongoose.model('postleaves');

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

//leave form route
app.get('/form', (req, res) => {
    res.render('leaveForm');
});

//process leave form
app.post('/leave-form', (req, res) => {
    // add preleave data into db
    const preLeaveData = {
        pre_casual_leave: req.body.pre_casual_leave,
        pre_outdoor_leave: req.body.pre_outdoor_leave,
        pre_medical_leave: req.body.pre_medical_leave,
        pre_special_leave: req.body.pre_special_leave
    }
    new PreLeave(preLeaveData)
    .save()
    .then(() => {
        const postLeaveData = {
            post_casual_leave: req.body.post_casual_leave,
            post_outdoor_leave: req.body.post_outdoor_leave,
            post_medical_leave: req.body.post_medical_leave,
            post_special_leave: req.body.post_special_leave
        }
        new PostLeave(postLeaveData)
        .save()
        .then(postleaves => {
            res.redirect('/showleaves');
        })
    })
    .catch(err => console.log(err));
});


port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));