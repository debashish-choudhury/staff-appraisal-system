const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//load Profile info model
require('../models/Profile');
const Profile = mongoose.model('profile');

// profile info
router.get('/index', (req, res) => {
    Profile.find({})
        .then(profile => {
            res.render('profile/index', {
                profile: profile
            });
        });
});

// add profile page
router.get('/addProfile', (req, res) => {
    res.render('profile/addProfile');
});

// edit profile page
router.get('/edit/:id', (req, res) => {
    Profile.findOne({
        _id: req.params.id
    })
    .then(profile => {
        res.render('profile/edit', {
            profile: profile
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
    new Profile(ProfileRecord)
        .save()
        .then((profile) => {
            req.flash('success_msg', 'Profile added');
            res.redirect('/profile/index');
        });
});

//process profile edit form
router.put('/:id', (req, res) => {
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
        .then(setTimeout(profile => {
            req.flash('success_msg', 'Profile edited');
            res.redirect('/profile/index');
        }, 3000));
    });
});

module.exports = router;