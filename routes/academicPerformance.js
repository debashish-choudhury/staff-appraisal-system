const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load teaching model
require('../models/TeachingLoad')
const TeachingLoad = mongoose.model('teachingload');

//load new books info model
require('../models/NewBooks');
const NewBooks = mongoose.model('newbooks');

//load added exxperiments info model
require('../models/AddedExp');
const AddedExp = mongoose.model('addedexp');

// Load innovative teaching technique model
require('../models/Innovation')
const Innovation = mongoose.model('innovation');

// Teaching load route
router.get('/teachingLoad', (req, res) => {
    res.render('academicPerformance/teachingLoad');
});

// new books load route
router.get('/newBooks', (req, res) => {
    res.render('academicPerformance/newBooks');
});

// added experiment load route
router.get('/addedExp', (req, res) => {
    res.render('academicPerformance/addedExp');
});

// innovative teaching technique load route
router.get('/innovativeTeaching', (req, res) => {
    res.render('academicPerformance/innovativeTeaching');
});

//process teaching form
router.post('/teachingLoad', (req, res) => {
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
            res.redirect('/academicPerformance/teachingLoad');
        });
});

//process new books form
router.post('/newBooks', (req, res) => {
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
            res.redirect('/academicPerformance/newBooks');
        });
});

//process added experiments form
router.post('/addedExp', (req, res) => {
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
            res.redirect('/academicPerformance/addedExp');
        });
});

//process innovation teaching technique form
router.post('/innovation', (req, res) => {
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
            res.redirect('/academicPerformance/innovativeTeaching');
        });
});

module.exports = router;