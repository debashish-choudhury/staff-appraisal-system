const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load teaching model
require('../models/AcademicPerformance/TeachingLoad')
const TeachingLoad = mongoose.model('teachingload');

// Load teaching assistant model
require('../models/AcademicPerformance/TeachingAssistant')
const TeachingAssistant = mongoose.model('teachingassistant');

//load new books info model
require('../models/AcademicPerformance/NewBooks');
const NewBooks = mongoose.model('newbooks');

//load added exxperiments info model
require('../models/AcademicPerformance/AddedExp');
const AddedExp = mongoose.model('addedexp');

// Load innovative teaching technique model
require('../models/AcademicPerformance/Innovation')
const Innovation = mongoose.model('innovation');

// Teaching load route
router.get('/teachingLoad', (req, res) => {
    res.render('academicPerformance/teachingLoad');
});

// Teaching load route
router.get('/teachingAssistant', (req, res) => {
    res.render('academicPerformance/teachingAssistant');
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
        academic_year: req.body.subject_name,
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
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/academicPerformance/teachingAssistant');
        });
});

//process teaching form
router.post('/teachingAssistant', (req, res) => {
    // add preleave data into db
    const teachingAssistantRecord = {
        faculty_name: req.body.faculty_name,
        class: req.body.class,
        semester: req.body.semester,
        subject: req.body.subject
    }
    new TeachingAssistant(teachingAssistantRecord)
        .save()
        .then(teachingAssistant => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/academicPerformance/newBooks');
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
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/academicPerformance/addedExp');
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
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/academicPerformance/innovativeTeaching');
        });
});

//process innovation teaching technique form
router.post('/innovation', (req, res) => {
    // add preleave data into db
    const InnovationTeachingRecords = {
        subject_name: req.body.subject_name,
        class_name: req.body.class_name,
        semester: req.body.semester,
        technique: req.body.technique
    }
    new Innovation(InnovationTeachingRecords)
        .save()
        .then(innovationrecords => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/leaveForm');
        });
});

module.exports = router;