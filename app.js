const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
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

//load Profile info model
require('./models/Profile');
const Profile = mongoose.model('profile');

// Load teaching model
require('./models/TeachingLoad')
const TeachingLoad = mongoose.model('teachingload');

//load new books info model
require('./models/NewBooks');
const NewBooks = mongoose.model('newbooks');

//load added exxperiments info model
require('./models/AddedExp');
const AddedExp = mongoose.model('addedexp');

// Load innovative teaching technique model
require('./models/Innovation')
const Innovation = mongoose.model('innovation');

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

// Teaching load route
app.get('/teachingLoad', (req, res) => {
    res.render('teachingLoad');
});

// new books load route
app.get('/newBooks', (req, res) => {
    res.render('newBooks');
});

// added experiment load route
app.get('/addedExp', (req, res) => {
    res.render('addedExp');
});

// innovative teaching technique load route
app.get('/innovativeTeaching', (req, res) => {
    res.render('innovativeTeaching');
});

// profile info
app.get('/profile/index', (req, res) => {
    Profile.find({})
        .then(profile => {
            res.render('profile/index', {
                profile: profile
            });
        });
});

// add profile page
app.get('/profile/addProfile', (req, res) => {
    res.render('profile/addProfile');
});

// edit profile page
app.get('/profile/edit/:id', (req, res) => {
    Profile.findOne({
        _id: req.params.id
    })
    .then(profile => {
        res.render('profile/edit', {
            profile: profile
        });
    });
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

//process staff form
app.post('/profile', (req, res) => {
    // add preleave data into db
    const ProfileRecord = {
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
    new Profile(ProfileRecord)
        .save()
        .then((profile) => {
            res.redirect('profile/index');
        });
});

//process teaching form
app.post('/teachingLoad', (req, res) => {
    // add preleave data into db
    const TeachingRecord = {
        subject_name: req.body.subject_name,
        class: req.body.class,
        department: req.body.department,
        semester: req.body.semester,
        theory_subject: req.body.theory_subject,
        lab_subject: req.body.lab_subject,
        tutorials: req.body.tutorials,
        theory_session: req.body.theory_session,
        practical_session: req.body.practical_session,
        Student_feedback: req.body.Student_feedback
    }
    new TeachingLoad(TeachingRecord)
        .save()
        .then(teaching => {
            res.redirect('teachingLoad');
        });
});

//process new books form
app.post('/newBooks', (req, res) => {
    // add preleave data into db
    const NewBooksRecord = {
        subject_name: req.body.subject_name,
        title: req.body.title,
        semester: req.body.semester,
        class: req.body.class,
        publication: req.body.publication,
        author: req.body.author
    }
    new NewBooks(NewBooksRecord)
        .save()
        .then(newbooks => {
            res.redirect('/newBooks');
        });
});

//process added experiments form
app.post('/addedExp', (req, res) => {
    // add preleave data into db
    const AddedExpRecord = {
        subject_name: req.body.subject_name,
        class: req.body.class,
        semester: req.body.semester,
        exp_name: req.body.exp_name
    }
    new AddedExp(AddedExpRecord)
        .save()
        .then(newbooks => {
            res.redirect('/addedExp');
        });
});

//process innovation teaching technique form
app.post('/innovation', (req, res) => {
    // add preleave data into db
    const InnovationTeachingRecords = {
        subject_name: req.body.subject_name,
        class: req.body.class,
        semester: req.body.semester,
        technique: req.body.technique
    }
    new Innovation(InnovationTeachingRecords)
        .save()
        .then(innovationrecords => {
            res.redirect('/innovativeTeaching');
        });
});

//process profile edit form
app.put('/profile/:id', (req, res) => {
    Profile.findOne({
        _id: req.params.id
    })
    .then(profile => {
        // New values
        profile.faculty_name = req.body.faculty_name,
        profile.designation = req.body.designation,
        profile.department = req.body.department,
        profile.qualification = req.body.qualification,
        profile.teaching_exp = req.body.teaching_exp,
        profile.appointment = req.body.appointment,
        profile.date_of_join = req.body.date_of_join,
        profile.DOB = req.body.DOB,
        profile.salary = req.body.salary

        profile.save()
        .then(profile => {
            res.redirect('/profile/index');
        })
    })
})


port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));