const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//load Faculty Profile info model
require('../models/Users/FacultyProfile');
const FacultyProfile = mongoose.model('faculty_profile');

//load Faculty Profile info model
require('../models/Users/HodProfile');
const HodProfile = mongoose.model('hod_profile');

// profile info
router.get('/index', (req, res) => {
    FacultyProfile.find({})
        .then(faculty_profile => {
            res.render('profile/index', {
                faculty_profile: faculty_profile
            });
        });
});

// add profile page
router.get('/addProfile', (req, res) => {
    res.render('profile/addProfile');
});

// edit profile page
router.get('/edit/:id', (req, res) => {
    FacultyProfile.findOne({
        _id: req.params.id
    })
    .then(faculty_profile => {
        res.render('profile/edit', {
            faculty_profile: faculty_profile
        });
    });
});

//process staff form
router.post('/', (req, res) => {
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
    new FacultyProfile(ProfileRecord)
        .save()
        .then((faculty_profile) => {
            req.flash('success_msg', 'Profile added');
            res.redirect('/profile/index');
        });
});

//process profile edit form
router.put('/:id', (req, res) => {
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
        .then(setTimeout(faculty_profile => {
            req.flash('success_msg', 'Profile edited');
            res.redirect('/profile/index');
        }, 3000));
    });
});

module.exports = router;