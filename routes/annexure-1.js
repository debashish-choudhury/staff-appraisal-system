const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load time table model
require('../models/Annexure-1/TimeTable')
const TimeTable = mongoose.model('timetable');

// Load class advisor model
require('../models/Annexure-1/ClassAdvisor')
const ClassAdvisor = mongoose.model('classadvisor');

// Load class advisor model
require('../models/Annexure-1/SportsActivities')
const SportsActivities = mongoose.model('sportsactivities');

// Load class advisor model
require('../models/Annexure-1/CulturalActivities')
const CulturalActivities = mongoose.model('culturalactivities');

// Load PBL model
require('../models/Annexure-1/ProjectBasedLearning')
const ProjectBasedLearning = mongoose.model('projectbasedlearning');

// Load udaan model
require('../models/Annexure-1/Udaan')
const Udaan = mongoose.model('udaan');

// Load plavement activities model
require('../models/Annexure-1/PlacementActivities')
const PlacementActivities = mongoose.model('placementactivities');

// Load inhouse placement model
require('../models/Annexure-1/InhousePlacement')
const InhousePlacement = mongoose.model('inhouseplacement');

// Load student organization model
require('../models/Annexure-1/StudentOrganizations')
const StudentOrganizations = mongoose.model('studentorganizations');

// Time table load route
router.get('/timeTable', (req, res) => {
    res.render('annexure-1/timeTable');
});

// Class advisor load route
router.get('/classAdvisor', (req, res) => {
    res.render('annexure-1/classAdvisor');
});

// Sports activity load route
router.get('/sportsActivities', (req, res) => {
    res.render('annexure-1/sportsActivities');
});

// Cultural activity load route
router.get('/culturalActivities', (req, res) => {
    res.render('annexure-1/culturalActivities');
});

// project based learning load route
router.get('/projectBasedLearning', (req, res) => {
    res.render('annexure-1/projectBasedLearning');
});

// udaan load route
router.get('/udaan', (req, res) => {
    res.render('annexure-1/udaan');
});

// Placement activities load route
router.get('/placementActivities', (req, res) => {
    res.render('annexure-1/placementActivities');
});

// Inhouse placement load route
router.get('/inhousePlacement', (req, res) => {
    res.render('annexure-1/inhousePlacement');
});

// student organization load route
router.get('/studentOrganizations', (req, res) => {
    res.render('annexure-1/studentOrganizations');
});

//process time table form
router.post('/timetable', (req, res) => {
    // add preleave data into db
    const timeTableRecords = {
        role: req.body.role,
        department: req.body.department,
        semester: req.body.semester
    }
    new TimeTable(timeTableRecords)
        .save()
        .then(timetable => {
            res.redirect('/annexure-1/timeTable');
        });
});

//process class advisor form
router.post('/classadvisor', (req, res) => {
    // add preleave data into db
    const classAdvisorRecords = {
        class_name: req.body.class_name,
        department: req.body.department,
        semester: req.body.semester,
        duties: req.body.duties
    }
    new ClassAdvisor(classAdvisorRecords)
        .save()
        .then(classAdvisor => {
            res.redirect('/annexure-1/classAdvisor');
        });
});

//process sports activities form
router.post('/sportsActivities', (req, res) => {
    // add preleave data into db
    const sportsActivitiesRecords = {
        sports_name: req.body.sports_name,
        sports_category: req.body.sports_category,
        sports_role: req.body.sports_role,
        sports_ojus_or_other: req.body.sports_ojus_or_other
    }
    new SportsActivities(sportsActivitiesRecords)
        .save()
        .then(sportsactivities => {
            res.redirect('/annexure-1/sportsActivities');
        });
});

//process cultural activities form
router.post('/culturalActivities', (req, res) => {
    // add preleave data into db
    const culturalActivitiesRecords = {
        cultural_name: req.body.cultural_name,
        cultural_category: req.body.cultural_category,
        cultural_role: req.body.cultural_role,
        cultural_ojus_or_other: req.body.cultural_ojus_or_other
    }
    new CulturalActivities(culturalActivitiesRecords)
        .save()
        .then(culturalsactivities => {
            res.redirect('/annexure-1/culturalActivities');
        });
});

//process PBL activities form
router.post('/projectBasedLearning', (req, res) => {
    // add preleave data into db
    const projectBasedLearningRecords = {
        pbl_subject: req.body.pbl_subject,
        pbl_role: req.body.pbl_role,
        pbl_start_date: req.body.pbl_start_date,
        pbl_end_date: req.body.pbl_end_date,
        pbl_description: req.body.pbl_description
    }
    new ProjectBasedLearning(projectBasedLearningRecords)
        .save()
        .then(projectBasedLearning => {
            res.redirect('/annexure-1/projectBasedLearning');
        });
});

//process Udaan activities form
router.post('/udaan', (req, res) => {
    // add preleave data into db
    const udaanRecords = {
        udaan_subject: req.body.udaan_subject,
        udaan_contribution: req.body.udaan_contribution,
        udaan_start_date: req.body.udaan_start_date,
        udaan_end_date: req.body.udaan_end_date
    }
    new Udaan(udaanRecords)
        .save()
        .then(udaan => {
            res.redirect('/annexure-1/udaan');
        });
});

//process placement activities form
router.post('/placementActivities', (req, res) => {
    // add preleave data into db
    const placementActivitiesRecords = {
        placement_role: req.body.placement_role,
        no_of_companies: req.body.no_of_companies,
        no_of_placed_students: req.body.no_of_placed_students,
        department: req.body.department
    }
    new PlacementActivities(placementActivitiesRecords)
        .save()
        .then(placementActivities => {
            res.redirect('/annexure-1/placementActivities');
        });
});

//process inhouse placement form
router.post('/inhousePlacement', (req, res) => {
    // add preleave data into db
    const inhousePlacementRecords = {
        trainings_and_workshops: req.body.trainings_and_workshops,
        class_name: req.body.class_name,
        department: req.body.department,
        no_of_participants: req.body.no_of_participants
    }
    new InhousePlacement(inhousePlacementRecords)
        .save()
        .then(inhousePlacement => {
            res.redirect('/annexure-1/inhousePlacement');
        });
});

//process inhouse placement form
router.post('/studentOrganizations', (req, res) => {
    // add preleave data into db
    const studentOrganizationRecords = {
        student_organizations_trainings: req.body.student_organizations_trainings,
        class_name: req.body.class_name,
        department: req.body.department,
        no_of_participants: req.body.no_of_participants,
        student_organization_role: req.body.student_organization_role,
        student_event_duration: req.body.student_event_duration,
        student_event_start_date: req.body.student_event_start_date,
        student_event_end_date: req.body.student_event_end_date
    }
    new StudentOrganizations(studentOrganizationRecords)
        .save()
        .then(studentOrganization => {
            res.redirect('/annexure-1/studentOrganizations');
        });
});

module.exports = router;