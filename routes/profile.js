const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

//load Faculty Profile info model
require('../models/Users/FacultyProfile');
const FacultyProfile = mongoose.model('faculty_profile');

//load Faculty Profile info model
require('../models/Users/HodProfile');
const HodProfile = mongoose.model('hod_profile');

// faculty profile info
router.get('/faculty/index', ensureAuthenticated, (req, res) => {
    FacultyProfile.find({ user: req.user.id })
        .then(faculty_profile => {
            res.render('profile/faculty/index', {
                faculty_profile: faculty_profile
            });
        });
});

// hod profile info
router.get('/hod/index', ensureAuthenticated, (req, res) => {
    HodProfile.find({ user: req.user.id })
        .then(hod_profile => {
            res.render('profile/hod/index', {
                hod_profile: hod_profile
            });
        });
});

// add faculty profile page
router.get('/faculty/addProfile', ensureAuthenticated, (req, res) => {
    res.render('profile/faculty/addProfile');
});

// add hod profile page
router.get('/hod/addProfile', ensureAuthenticated, (req, res) => {
    res.render('profile/hod/addProfile');
});

// edit faculty profile page
router.get('/faculty/edit/:id', ensureAuthenticated, (req, res) => {
    FacultyProfile.findOne({
        _id: req.params.id
    })
        .then(faculty_profile => {
            if (faculty_profile.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/profile/faculty/index');
            } else {
                res.render('profile/faculty/edit', {
                    faculty_profile: faculty_profile
                });
            }
        });
});

// edit hod profile page
router.get('/hod/edit/:id', ensureAuthenticated, (req, res) => {
    HodProfile.findOne({
        _id: req.params.id
    })
        .then(hod_profile => {
            res.render('profile/hod/edit', {
                hod_profile: hod_profile
            });
        });
});

//process staff form
router.post('/faculty', (req, res) => {
    // add preleave data into db
    const FacultyProfileRecord = {
        faculty_name: req.body.faculty_name,
        designation: req.body.designation,
        department: req.body.department,
        qualification: req.body.qualification,
        teaching_exp: req.body.teaching_exp,
        appointment: req.body.appointment,
        date_of_join: req.body.date_of_join,
        DOB: req.body.DOB,
        salary: req.body.salary,
        user: req.user.id
    }
    new FacultyProfile(FacultyProfileRecord)
        .save()
        .then((faculty_profile) => {
            req.flash('success_msg', 'Profile added');
            res.redirect('/profile/faculty/index');
        });
});

//process hod edit profile form
router.post('/hod', (req, res) => {
    // add preleave data into db
    const HodProfileRecord = {
        hod_name: req.body.hod_name,
        designation: req.body.designation,
        department: req.body.department,
        qualification: req.body.qualification,
        teaching_exp: req.body.teaching_exp,
        appointment: req.body.appointment,
        date_of_join: req.body.date_of_join,
        DOB: req.body.DOB,
        salary: req.body.salary,
        user: req.user.id
    }
    new HodProfile(HodProfileRecord)
        .save()
        .then((hod_profile) => {
            req.flash('success_msg', 'Profile added');
            res.redirect('/profile/hod/index');
        });
});

//process profile edit form
router.put('/faculty/:id', (req, res) => {
    FacultyProfile.findOne({
        _id: req.params.id
    })
        .then(faculty_profile => {
            // New values
            faculty_profile.faculty_name = req.body.faculty_name,
                faculty_profile.designation = req.body.designation,
                faculty_profile.department = req.body.department,
                faculty_profile.qualification = req.body.qualification,
                faculty_profile.teaching_exp = req.body.teaching_exp,
                faculty_profile.appointment = req.body.appointment,
                faculty_profile.date_of_join = req.body.date_of_join,
                faculty_profile.DOB = req.body.DOB,
                faculty_profile.salary = req.body.salary

            faculty_profile.save()
                .then(faculty_profile => {
                    req.flash('success_msg', 'Profile edited');
                    res.redirect('/profile/faculty/index');
                });
        });
});

//process profile edit form
router.put('/hod/:id', (req, res) => {
    HodProfile.findOne({
        _id: req.params.id
    })
        .then(hod_profile => {
            // New values
            hod_profile.hod_name = req.body.hod_name,
                hod_profile.designation = req.body.designation,
                hod_profile.department = req.body.department,
                hod_profile.qualification = req.body.qualification,
                hod_profile.teaching_exp = req.body.teaching_exp,
                hod_profile.appointment = req.body.appointment,
                hod_profile.date_of_join = req.body.date_of_join,
                hod_profile.DOB = req.body.DOB,
                hod_profile.salary = req.body.salary

            hod_profile.save()
                .then(hod_profile => {
                    req.flash('success_msg', 'Profile edited');
                    res.redirect('/profile/hod/index');
                });
        });
});

module.exports = router;