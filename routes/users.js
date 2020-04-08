const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');


// Load faculty model
require('../models/Users/Faculty');
const Faculty = mongoose.model('users');

// Load faculty model
require('../models/Users/FacultyProfile');
const FacultyProfile = mongoose.model('faculty_profile');

// Load faculty marks model
require('../models/Users/FacultyMarks');
const FacultyMarks = mongoose.model('faculty-marks')

// Load HOD model
require('../models/Users/Hod');
const Hod = mongoose.model('hod');

// Load HOD confidential form model
require('../models/Users/Confidential');
const Confidential = mongoose.model('confidential_form');

// User register form
router.get('/register', (req, res) => {
    res.render('users/register');
});

// faculty user login form
router.get('/faculty/login', (req, res) => {
    res.render('users/faculty/login');
});

router.get('/faculty/facultyOverview', ensureAuthenticated, (req, res) => {
    FacultyMarks.find({ user: req.user.id })
        .then(result => {
            res.render('users/faculty/facultyOverview', { result });
        })
});

// Faculty final overview submission with marks
router.post('/faculty/facultyOverview', (req, res) => {

    let errors = [];

    if (!req.body.academicPerformance || req.body.academicPerformance > 40 || req.body.academicPerformance < 0) {
        errors.push({ text: 'Please enter marks between 0 to 40' });
    } else if (!req.body.leaveRecord || req.body.leaveRecord > 40 || req.body.leaveRecord < 0) {
        errors.push({ text: 'Please enter marks between 0 to 40' });
    } else if (!req.body.annexure_1 || req.body.annexure_1 > 40 || req.body.annexure_1 < 0) {
        errors.push({ text: 'Please enter marks between 0 to 40' });
    } else if (!req.body.annexure_2 || req.body.annexure_2 > 40 || req.body.annexure_2 < 0) {
        errors.push({ text: 'Please enter marks between 0 to 40' });
    } else if (!req.body.annexure_3 || req.body.annexure_3 > 40 || req.body.annexure_3 < 0) {
        errors.push({ text: 'Please enter marks between 0 to 40' });
    }

    if (errors.length > 0) {
        res.render('users/faculty/facultyOverview', {
            errors: errors,
            academicPerformance: req.body.academicPerformance,
            leaveRecord: req.body.leaveRecord,
            annexure_1: req.body.annexure_1,
            annexure_2: req.body.annexure_2,
            annexure_3: req.body.annexure_3
        });
    }
    else {
        const marks = {
            academicPerformance: req.body.academicPerformance,
            leaveRecord: req.body.leaveRecord,
            annexure_1: req.body.annexure_1,
            annexure_2: req.body.annexure_2,
            annexure_3: req.body.annexure_3,
            user: req.user.id
        }
        new FacultyMarks(marks)
            .save()
            .then(faculty_marks => {
                req.flash('success_msg', 'Successfully added marks for evaluation');
                res.redirect('/users/faculty/facultyOverview');
            })
    }
});

// hod user login form
router.get('/hod/login', (req, res) => {
    res.render('users/hod/login');
});

// hod Confidential form
router.get('/hod/confidential', ensureAuthenticated, (req, res) => {
    res.render('users/hod/confidential');
});

// hod overview form
router.get('/hod/hodOverview', ensureAuthenticated, (req, res) => {
    FacultyMarks.findOne({})
        .then(marks => {
            console.log(marks);
            res.render('users/hod/hodOverview', {
                marks: marks
            });
        })
});

// User register form
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/faculty/login',
    passport.authenticate('faculty', { successRedirect: '/', failureRedirect: '/users/faculty/login', failureFlash: true }));

router.post('/hod/login',
    passport.authenticate('hod', { successRedirect: '/users/hod/home', failureRedirect: '/users/hod/login', failureFlash: true }));

router.get('/hod/home', ensureAuthenticated, (req, res) => {
    const facultyRegistered = Faculty.find({}).exec();
    const facultyMarks = FacultyMarks.find({}).limit(1).exec();
    Promise.all([facultyRegistered, facultyMarks]).then(result => {
        // return Promise.all(result.map(r => JSON.stringify(r)));
        return Promise.all(result);
    }).then(([faculty, marks]) => {
        console.log(faculty);
        console.log(marks);
        res.render('users/hod/home', {
            faculty: faculty
        });
    });
});

router.post('/hod/confidential', (req, res) => {
    let errors = [];
    if (req.body.value1 == '' || req.body.value2 == '' || req.body.value3 == '' || req.body.value4 == '' || req.body.value5 == '') {
        errors.push({ text: 'Please mark all the buttons' });
    } else {
        const confidentialForm = {
            value1: req.body.value1,
            value2: req.body.value2,
            value3: req.body.value3,
            value4: req.body.value4,
            value5: req.body.value5
        }
        new Confidential(confidentialForm)
            .save()
            .then(confidential_form => {
                req.flash('success_msg', 'Marks added successfully');
                res.redirect('/users/hod/home');
            })
    }
});

// Register Form POST
router.post('/register', (req, res) => {
    var type = req.body.type;
    if (type === 'faculty') {
        let errors = [];
        if (req.body.password != req.body.password2) {
            errors.push({ text: 'Password do not match' });
        }
        if (req.body.password.length < 4) {
            errors.push({ text: 'Password must be atleast 4 characters' });
        }
        if (errors.length > 0) {
            res.render('users/register', {
                errors: errors,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                password2: req.body.password2
            });
        } else {
            Faculty.findOne({ email: req.body.email })
                .then(user => {
                    if (user) {
                        req.flash('error_msg', 'Email already registered');
                        res.redirect('/users/faculty/login');
                    } else {
                        const newUser = new Faculty({
                            name: req.body.name,
                            email: req.body.email,
                            type: req.body.type,
                            password: req.body.password
                        });

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', 'You are now registered and can login');
                                        res.redirect('/users/faculty/login')
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        return;
                                    });
                            });
                        });
                    }
                })
        }
    } else if (type === 'hod') {
        let errors = [];
        if (req.body.password != req.body.password2) {
            errors.push({ text: 'Password do not match' });
        }
        if (req.body.password.length < 4) {
            errors.push({ text: 'Password must be atleast 4 characters' });
        }
        if (errors.length > 0) {
            res.render('users/register', {
                errors: errors,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                password2: req.body.password2
            });
        } else {
            Hod.findOne({ email: req.body.email })
                .then(user => {
                    if (user) {
                        req.flash('error_msg', 'Email already registered');
                        res.redirect('/users/hod/login');
                    } else {
                        const newUser = new Hod({
                            name: req.body.name,
                            email: req.body.email,
                            type: req.body.type,
                            password: req.body.password
                        });

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', 'You are now registered and can login');
                                        res.redirect('/users/hod/login')
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        return;
                                    });
                            });
                        });
                    }
                })
        }
    }

});

// Logout user
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

module.exports = router;