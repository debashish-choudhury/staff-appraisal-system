const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

require('../models/Leave');
const Leave = mongoose.model('leaves');

//leave form route
router.get('/', ensureAuthenticated, (req, res) => {
    Leave.find({ user: req.user.id })
    .then(result => {
        res.render('leaveForm', {result});
    })
});

// Get Edit form for leave
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Leave.findOne({ _id: req.params.id })
    .then(result => {
        if(result.user != req.user.id) {
            req.flash('error_msg', 'Not Authorized');
            res.redirect('/leaveForm');
        } else {
            res.render('leaveForm', { editResult: result });
        }
    })
});

//process leave form
router.post('/', (req, res) => {
    // add preleave data into db
    const LeaveRecord = {
        pre_casual_leave: req.body.pre_casual_leave,
        pre_outdoor_leave: req.body.pre_outdoor_leave,
        pre_medical_leave: req.body.pre_medical_leave,
        pre_special_leave: req.body.pre_special_leave,
        post_casual_leave: req.body.post_casual_leave,
        post_outdoor_leave: req.body.post_outdoor_leave,
        post_medical_leave: req.body.post_medical_leave,
        post_special_leave: req.body.post_special_leave,
        user: req.user.id
    }
    new Leave(LeaveRecord)
        .save()
        .then(leaves => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/timeTable');
        });
});

// Update Leave form
router.put('/:id', (req, res) => {
    Leave.findOne({ _id: req.params.id })
    .then(result => {
        result.pre_casual_leave =req.body.pre_casual_leave,
        result.pre_outdoor_leave =req.body.pre_outdoor_leave,
        result.pre_medical_leave = req.body.pre_medical_leave,
        result.pre_special_leave =req.body.pre_special_leave,
        result.post_casual_leave =req.body.post_casual_leave,
        result.post_outdoor_leave =req.body.post_outdoor_leave,
        result.post_medical_leave =req.body.post_medical_leave,
        result.post_special_leave =req.body.post_special_leave

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/leave');
        })
    })
});

//DELETE leave form
router.delete('/:id', (req, res) => {
    Leave.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data Deleted successfully');
        res.redirect('/leave');
    })
});

module.exports = router