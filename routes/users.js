const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
var fs = require('fs');
// var Chart = require('chart.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { ensureAuthenticated } = require('../helpers/auth');

var modules = require('../config/modules');
const AcademicYear = require('../config/academicYear');

let facultID;
let facultyName;
let facultyEmail;
let year;

// Load faculty model
require('../models/Users/Faculty');
const Faculty = mongoose.model('users');

// Load faculty marks model
require('../models/Users/FacultyMarks');
const FacultyMarks = mongoose.model('faculty-marks');

// Load Hod marks
require('../models/Users/HodMarks');
const HodMarks = mongoose.model('hod-marks');

// Load HOD model
require('../models/Users/Hod');
const Hod = mongoose.model('hod');

// Load HOD confidential form model
require('../models/Users/Confidential');
const Confidential = mongoose.model('confidential_form');

// Load Manager model
require('../models/Users/ManagerDB');
const Manager = mongoose.model('management_user');

// faculty user login form
router.get('/faculty/login', (req, res) => {
    res.render('users/faculty/login');
});

router.get('/management/login', (req, res) => {
    res.render('users/management/login');
});

// hod user login form
router.get('/hod/login', (req, res) => {
    res.render('users/hod/login');
});

// Faculty Overview form
router.get('/faculty/facultyOverview', ensureAuthenticated, (req, res) => {
    let finalResult;
    Faculty.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                AcademicYear.find({ user: req.user.id })
                    .then(result => {
                        if (!result) {
                            req.flash('error_msg', 'Select the academic year before proceeding');
                            res.redirect('/');
                        }
                        // academic_year_id = result[0].user;
                        year = result[0].academic_year;
                        FacultyMarks.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                            .then(result => {

                                finalResult = result;
                                var loads = [modules.TeachingLoad.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.TeachingAssistant.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.NewBooks.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.AddedExp.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.Innovation.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),

                                modules.Leave.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),

                                modules.TimeTable.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.ClassAdvisor.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.SportsActivities.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.CulturalActivities.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.ProjectBasedLearning.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.Udaan.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.PlacementActivities.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.InhousePlacement.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.StudentOrganizations.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.IndustrialVisitActivities.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.AdmissionProcessActivities.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.ExamAssessmentExternal.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.ExamActivitiesSupervision.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.ExamActivitiesCollegeLevel.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.ITMaintenance.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.Lakshya.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.MagazineNewsletter.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.STTP.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.DepartmentUGProjects.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),

                                modules.PapersPublishedNationalConf.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.PapersPublishedInternationalConf.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.PapersPublishedJournals.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.Moocs.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.Swayam.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.ShortTermTraining.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.Seminars.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),

                                modules.ResourcePerson.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.ContributionToSyllabus.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.MemberOfUniversityCommitte.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.ConsultancyAssignment.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
                                modules.ExternalProjectsOrCompetition.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec()
                                ];
                                Promise.all(loads)
                                    .then(result => {
                                        return Promise.all(result);
                                    })
                                    .then(([teachingLoad, teachingAssistant, newBooks, addedExp, innovation,
                                        leave,
                                        timeTable, classAdvisor, sportsActivities, culturalActivities, projectBasedLearning, udaan, placementActivities, inhousePlacement, studentOrganizations, industrialVisitActivities, admissionProcessActivities, examAssessmentExternal, examActivitiesSupervision, examActivitiesCollegeLevel, itMaintenance, lakshya, magazineNewsletter, sttp, departmentUGProjects,
                                        papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars,
                                        resourcePerson, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition]) => {

                                        res.render('users/faculty/facultyOverview', { finalResult, teachingLoad, teachingAssistant, newBooks, addedExp, innovation, leave, timeTable, classAdvisor, sportsActivities, culturalActivities, projectBasedLearning, udaan, placementActivities, inhousePlacement, studentOrganizations, industrialVisitActivities, admissionProcessActivities, examAssessmentExternal, examActivitiesSupervision, examActivitiesCollegeLevel, itMaintenance, lakshya, magazineNewsletter, sttp, departmentUGProjects, papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars, resourcePerson, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition });
                                    })
                            })
                            .catch(err => {
                                if (err) throw err;
                            })
                    })
            }
        })
});

// Management route
router.get('/management/home', ensureAuthenticated, (req, res) => {
    Manager.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                HodMarks.find({})
                    .sort({ date: 'desc' })
                    .then(result => {
                        if (!result) {
                            req.flash('error_msg', 'No submissions yet.');
                            res.redirect('/users/management/home');
                        } else {
                            res.render('users/management/home', { result });
                        }
                    })
            }
        })
});

// Post search route for management user
router.post('/management/search', (req, res) => {
    var fltEmail = req.body.filterEmail;
    var academicYear = req.body.academic_year;
    if (fltEmail != '' && academicYear != '') {
        var filterParameter = { $and: [{ faculty_email: fltEmail }, { academic_year: academicYear }] }
    } else if (fltEmail == '' && academicYear != '') {
        var filterParameter = { academic_year: academicYear }
    } else if (fltEmail != '' && academicYear == '') {
        var filterParameter = { faculty_email: fltEmail }
    } else {
        var filterParameter = {};
    }
    HodMarks.find(filterParameter)
        .sort({ date: 'desc' })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'No submissions yet.');
                res.redirect('/users/management/home');
            } else {
                var facultyName = [];
                var marks = [];
                var totalYear = [];
                result.forEach(function (arrayItem) {
                    facultyName.push(arrayItem.faculty_name);
                    marks.push(arrayItem.academicPerformance);
                    totalYear.push(arrayItem.academic_year);
                });
                let name = { facultyName };
                let finalMarks = { marks };
                let year = { totalYear };
                res.render('users/management/home', { result, fltEmail, academicYear, name, finalMarks, year });
            }
        })
});

// HoD Appraisal List route
router.get('/hod/appraisalList', ensureAuthenticated, (req, res) => {
    Hod.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                HodMarks.find({})
                    .sort({ date: 'desc' })
                    .then(result => {
                        if (!result) {
                            req.flash('error_msg', 'No submissions yet.');
                            res.redirect('/users/hod/home');
                        } else {
                            res.render('users/hod/appraisalList', { result });
                        }
                    })
            }
        })
});

// Post route for HoD search
router.post('/hod/search', (req, res) => {
    var fltEmail = req.body.filterEmail;
    var academicYear = req.body.academic_year;
    if (fltEmail != '' && academicYear != '') {
        var filterParameter = { $and: [{ faculty_email: fltEmail }, { academic_year: academicYear }] }
    } else if (fltEmail == '' && academicYear != '') {
        var filterParameter = { academic_year: academicYear }
    } else if (fltEmail != '' && academicYear == '') {
        var filterParameter = { faculty_email: fltEmail }
    } else {
        var filterParameter = {};
    }
    HodMarks.find(filterParameter)
        .sort({ date: 'desc' })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'No submissions yet.');
                res.redirect('/users/hod/home');
            } else {
                res.render('users/hod/appraisalList', { result, fltEmail, academicYear });
            }
        })
});

// Hod year check
router.get('/hod/check/year/:id', ensureAuthenticated, (req, res) => {
    let facultyDetails;
    Hod.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error-msg', 'Not Authorized');
                res.redirect('back');
            } else {
                Faculty.find({ _id: req.params.id })
                    .then(result => {
                        facultyName = result[0].name;
                        facultyEmail = result[0].email;
                        FacultyMarks.find({ user: req.params.id })
                            .sort({ date: 'desc' })
                            .then(result => {
                                facultID = result[0].user;
                                res.render('users/hod/checkYear', { result, facultID, facultyName, facultyEmail });
                            })
                            .catch(err => {
                                req.flash('error_msg', 'No submissions yet.');
                                res.redirect('/users/hod/home');
                            })
                    })
            }
        })
});

// hod overview form
router.get('/hod/hodOverview/:id/:year', ensureAuthenticated, (req, res) => {
    let finalResult;
    Hod.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error-msg', 'Not Authorized');
                res.redirect('back');
            } else {
                FacultyMarks.find({ $and: [{ user: req.params.id }, { academic_year: req.params.year }] })
                    .then(marks => {
                        finalResult = marks;
                        facultID = marks[0].user;
                        year = req.params.year;
                        //console.log(facultID);
                        //console.log(finalResult);
                        var loads = [modules.TeachingLoad.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.TeachingAssistant.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.NewBooks.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.AddedExp.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.Innovation.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),

                        modules.Leave.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),

                        modules.TimeTable.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.ClassAdvisor.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.SportsActivities.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.CulturalActivities.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.ProjectBasedLearning.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.Udaan.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.PlacementActivities.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.InhousePlacement.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.StudentOrganizations.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.IndustrialVisitActivities.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.AdmissionProcessActivities.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.ExamAssessmentExternal.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.ExamActivitiesSupervision.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.ExamActivitiesCollegeLevel.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.ITMaintenance.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.Lakshya.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.MagazineNewsletter.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.STTP.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.DepartmentUGProjects.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),

                        modules.PapersPublishedNationalConf.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.PapersPublishedInternationalConf.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.PapersPublishedJournals.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.Moocs.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.Swayam.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.ShortTermTraining.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.Seminars.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),

                        modules.ResourcePerson.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.ContributionToSyllabus.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.MemberOfUniversityCommitte.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.ConsultancyAssignment.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),
                        modules.ExternalProjectsOrCompetition.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec(),

                        HodMarks.findOne({ $and: [{ user: facultID }, { academic_year: req.params.year }] }).exec()
                        ];
                        Promise.all(loads)
                            .then(result => {
                                return Promise.all(result);
                            })
                            .then(([teachingLoad, teachingAssistant, newBooks, addedExp, innovation,
                                leave,
                                timeTable, classAdvisor, sportsActivities, culturalActivities, projectBasedLearning, udaan, placementActivities, inhousePlacement, studentOrganizations, industrialVisitActivities, admissionProcessActivities, examAssessmentExternal, examActivitiesSupervision, examActivitiesCollegeLevel, itMaintenance, lakshya, magazineNewsletter, sttp, departmentUGProjects,
                                papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars,
                                resourcePerson, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition,
                                hodMarks,
                            ]) => {

                                res.render('users/hod/hodOverview', { finalResult, teachingLoad, teachingAssistant, newBooks, addedExp, innovation, leave, timeTable, classAdvisor, sportsActivities, culturalActivities, projectBasedLearning, udaan, placementActivities, inhousePlacement, studentOrganizations, industrialVisitActivities, admissionProcessActivities, examAssessmentExternal, examActivitiesSupervision, examActivitiesCollegeLevel, itMaintenance, lakshya, magazineNewsletter, sttp, departmentUGProjects, papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars, resourcePerson, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition, hodMarks, year });
                            })
                    })
                    .catch(err => {
                        req.flash('error_msg', 'No submissions yet.');
                        res.redirect('/users/hod/home');
                    })
            }
        })
});

router.post('/faculty/login',
    passport.authenticate('faculty', { successRedirect: '/', failureRedirect: '/users/faculty/login', failureFlash: true }));

router.post('/hod/login',
    passport.authenticate('hod', { successRedirect: '/users/hod/home', failureRedirect: '/users/hod/login', failureFlash: true }));

router.post('/management/login',
    passport.authenticate('management_user', { successRedirect: '/users/management/home', failureRedirect: '/users/management/login', failureFlash: true }));

// Faculty final overview submission with marks
router.post('/faculty/facultyOverview/:year', (req, res) => {

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
        modules.TeachingLoad.findOne({ $and: [{ user: req.user.id }, { academic_year: req.params.year }] }).then(result => {
            if (!result) {
                req.flash('error_msg', 'Teaching load form is compulsory');
                res.redirect('/users/faculty/facultyOverview');
            } else {
                const marks = {
                    academic_year: year,
                    academicPerformance: req.body.academicPerformance,
                    leaveRecord: req.body.leaveRecord,
                    annexure_1: req.body.annexure_1,
                    annexure_2: req.body.annexure_2,
                    annexure_3: req.body.annexure_3,
                    user: req.user.id
                }
                new FacultyMarks(marks)
                    .save()
                    .then(() => {
                        req.flash('success_msg', 'Successfully added marks for evaluation');
                        res.redirect('/users/faculty/facultyOverview');
                    })
                    .catch(err => {
                        if (err) throw err;
                    })
            }
        })
    }
});

// PDF route POST for faculty
router.post('/faculty/pdf', ensureAuthenticated, (req, res) => {
    Faculty.find({ _id: req.user.id })
        .then(result => {
            facultyName = result[0].name;
            facultyEmail = result[0].email;
            var loads = [modules.TeachingLoad.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.TeachingAssistant.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.NewBooks.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.AddedExp.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.Innovation.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }),

            modules.Leave.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),

            modules.TimeTable.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ClassAdvisor.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.SportsActivities.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.CulturalActivities.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ProjectBasedLearning.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.Udaan.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.PlacementActivities.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.InhousePlacement.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.StudentOrganizations.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.IndustrialVisitActivities.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.AdmissionProcessActivities.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ExamAssessmentExternal.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ExamActivitiesSupervision.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ExamActivitiesCollegeLevel.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ITMaintenance.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.Lakshya.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.MagazineNewsletter.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.STTP.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.DepartmentUGProjects.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),

            modules.PapersPublishedNationalConf.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.PapersPublishedInternationalConf.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.PapersPublishedJournals.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.Moocs.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.Swayam.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ShortTermTraining.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.Seminars.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),

            modules.ResourcePerson.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ContributionToSyllabus.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.MemberOfUniversityCommitte.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ConsultancyAssignment.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec(),
            modules.ExternalProjectsOrCompetition.findOne({ $and: [{ user: req.user.id }, { academic_year: year }] }).exec()
            ];

            Promise.all(loads)
                .then(result => {
                    return Promise.all(result);
                })
                .then(([teachingLoad, teachingAssistant, newBooks, addedExp, innovation,
                    leave,
                    timeTable, classAdvisor, sportsActivities, culturalActivities, projectBasedLearning, udaan, placementActivities, inhousePlacement, studentOrganizations, industrialVisitActivities, admissionProcessActivities, examAssessmentExternal, examActivitiesSupervision, examActivitiesCollegeLevel, itMaintenance, lakshya, magazineNewsletter, sttp, departmentUGProjects,
                    papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars,
                    resourcePerson, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition]) => {
                    if (!teachingLoad) {
                        req.flash('error_msg', 'Teaching load form is compulsory to fill');
                        res.redirect('/users/faculty/facultyOverview');
                    }
                    if (!teachingAssistant) { teachingAssistant = { faculty_name: '-', class: '-', semester: '-', subject: '-' } }
                    if (!newBooks) { newBooks = { subject_name: '-', title: '-', semester: '-', class: '-', publication: '-', author: '-' } }
                    if (!addedExp) { addedExp = { subject_name: '-', class: '-', semester: '-', exp_name: '-' } }
                    if (!innovation) { innovation = { subject_name: '-', class_name: '-', semester: '-', technique: '-' } }
                    if (!leave) { leave = { pre_casual_leave: '-', pre_outdoor_leave: '-', pre_medical_leave: '-', pre_special_leave: '-', post_casual_leave: '-', post_outdoor_leave: '-', post_medical_leave: '-', post_special_leave: '-' } }
                    if (!timeTable) { timeTable = { role: '-', department: '-', semester: '-' } }
                    if (!classAdvisor) { classAdvisor = { class_name: '-', department: '-', semester: '-', duties: '-' } }
                    if (!sportsActivities) { sportsActivities = { sports_name: '-', sports_category: '-', sports_role: '-', sports_ojus_or_other: '-' } }
                    if (!culturalActivities) { culturalActivities = { cultural_name: '-', cultural_category: '-', cultural_role: '-', cultural_ojus_or_other: '-' } }
                    if (!projectBasedLearning) { projectBasedLearning = { pbl_subject: '-', pbl_role: '-', pbl_start_date: '-', pbl_end_date: '-', pbl_description: '-' } }
                    if (!udaan) { udaan = { udaan_subject: '-', udaan_contribution: '-', udaan_start_date: '-', udaan_end_date: '-' } }
                    if (!placementActivities) { placementActivities = { placement_role: '-', no_of_companies: '-', no_of_placed_students: '-', department: '-' } }
                    if (!inhousePlacement) { inhousePlacement = { trainings_and_workshops: '-', class_name: '-', department: '-', no_of_participants: '-' } }
                    if (!studentOrganizations) { studentOrganizations = { student_organizations_trainings: '-', class_name: '-', department: '-', no_of_participants: '-', student_organization_role: '-', student_event_duration: '-', student_event_start_date: '-', student_event_end_date: '-' } }
                    if (!industrialVisitActivities) { industrialVisitActivities = { industrial_visit_role: '-', class_name: '-', department: '-', industrial_visit_days: '-', industrial_visit_organizer: '-', name_of_company: '-', iv_description: '-', industrial_visit_hrs: '-', iv_start_date: '-', iv_end_date: '-' } }
                    if (!admissionProcessActivities) { admissionProcessActivities = { admission_role: '-', admission_duties: '-', admission_class: '-', admission_start_date: '-', admission_end_date: '-' } }
                    if (!examAssessmentExternal) { examAssessmentExternal = { exam_role_external: '-', semester: '-', name_of_college_university: '-', exam_subject_external: '-', outdoor_activities: '-', papers_revaluated: '-', papers_moderated: '-' } }
                    if (!examActivitiesSupervision) { examActivitiesSupervision = { exam_role: '-', exam_name: '-', morning_sessions: '-', evening_sessions: '-', no_of_supervision_days: '-' } }
                    if (!examActivitiesCollegeLevel) { examActivitiesCollegeLevel = { subject_name: '-', semester: '-', exam_type: '-' } }
                    if (!itMaintenance) { itMaintenance = { class_name: '-', IT_maintenance_desc: '-', IT_maintenance_task: '-', it_maintenance_date: '-' } }
                    if (!lakshya) { lakshya = { lakshya_activities: '-', lakshya_description: '-', lakshya_date: '-', lakshya_no_of_participants: '-' } }
                    if (!magazineNewsletter) { magazineNewsletter = { class_name: '-', magazine_role: '-', magazineNewsletter_type: '-', year_of_publication: '-' } }
                    if (!sttp) { sttp = { sttp_role: '-', no_of_sttp: '-', sttp_technology: '-', sttp_duration: '-', sttp_start_date: '-', sttp_end_date: '-', sttp_participants: '-', department: '-' } }
                    if (!departmentUGProjects) { departmentUGProjects = { dept_project_role: '-', project_title: '-', project_no_of_students: '-' } }
                    if (!papersPublishedNationalConf) { papersPublishedNationalConf = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!papersPublishedInternationalConf) { papersPublishedInternationalConf = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!papersPublishedJournals) { papersPublishedJournals = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!moocs) { moocs = { name_of_moocs_undertaken: '-', moocs_date: '-', moocs_duartion: '-', certification_status: '-' } }
                    if (!swayam) { swayam = { name_of_swayam_undertaken: '-', swayam_date: '-', swayam_duartion: '-', certification_status: '-' } }
                    if (!shortTermTraining) { shortTermTraining = { short_term_training: '-', techonology: '-', duration_of_course: '-', start_date: '-', end_date: '-', internal_external: '-', name_of_institue: '-' } }
                    if (!seminars) { seminars = { name_of_seminar: '-', techonology: '-', duration_of_course: '-', start_date: '-', end_date: '-', internal_external: '-', name_of_institue: '-' } }
                    if (!resourcePerson) { resourcePerson = { topicName: '-', department: '-', nameofInstitute: '-', numberofParticipants: '-' } }
                    if (!contributionToSyllabus) { contributionToSyllabus = { nameofSub: '-', role: '-', nameofUniversity: '-', otherDetails: '-' } }
                    if (!memberOfUniversityCommitte) { memberOfUniversityCommitte = { nameofCommittee: '-', rolesAndResponsibility: '-', designation: '-' } }
                    if (!consultancyAssignment) { consultancyAssignment = { rolesAndResponsilbilty: '-', typeOfWorkorDomain: '-', organization: '-', duration: '-', numberofVisits: '-' } }
                    if (!externalProjectsOrCompetition) { externalProjectsOrCompetition = { description: '-', contribution: '-', university: '-', duration: '-', comments: '-' } }

                    document = {
                        content: [
                            { text: 'Self Appraisal Report', style: 'header' },
                            { text: 'Academic Year: ' + teachingLoad.academic_year, style: 'header' },

                            'Name: ' + facultyName + '\n',
                            'Email ID: ' + facultyEmail + '\n',

                            { text: 'Academic Performance', style: 'subheader' },
                            { text: '1. Teaching Load', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Class', 'Department', 'Semester', 'Theory Load', 'Lab Load', 'Tutorials Load ', 'Theory sessions', 'Practical Sessions', 'Feedback'],
                                        [teachingLoad.subject_name, teachingLoad.class, teachingLoad.department, teachingLoad.semester, teachingLoad.theory_subject, teachingLoad.lab_subject, teachingLoad.tutorials, teachingLoad.theory_session, teachingLoad.practical_session, teachingLoad.Student_feedback]
                                    ]
                                }
                            },

                            { text: '2. Teaching Assistant', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['TA Name', 'Class', 'Semester', 'Subject Contribution'],
                                        [teachingAssistant.faculty_name, teachingAssistant.class, teachingAssistant.semester, teachingAssistant.subject]
                                    ]
                                }
                            },

                            { text: '3. New Books Suggested to Library', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Class', 'Semester', 'Title', 'Publication', 'Author '],
                                        [newBooks.subject_name, newBooks.class, newBooks.semester, newBooks.title, newBooks.publication, newBooks.author]
                                    ]
                                }
                            },

                            { text: '4. Additional Experiments added to lab manual', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Class', 'Semester', 'Experiment Name'],
                                        [addedExp.subject_name, addedExp.class, addedExp.semester, addedExp.exp_name]
                                    ]
                                }
                            },

                            { text: '5. Innovative Teaching Technique Adopted', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Class', 'Semester', 'Technique Adopted'],

                                        [innovation.subject_name, innovation.class_name, innovation.semester, innovation.technique]
                                    ]
                                }
                            },
                            { text: 'Leave Record', style: 'subheader' },
                            { text: '1. Pre-Sanctioned Leave Record', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Causal Leave', 'Outdoor Leave', 'Medical Leave', 'Special Leave'],
                                        [leave.pre_casual_leave, leave.pre_outdoor_leave, leave.pre_medical_leave, leave.pre_special_leave]
                                    ]
                                }
                            },
                            { text: '1. Post-Sanctioned Leave Record', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Causal Leave', 'Outdoor Leave', 'Medical Leave', 'Special Leave'],
                                        [leave.post_casual_leave, leave.post_outdoor_leave, leave.post_medical_leave, leave.post_special_leave]
                                    ]
                                }
                            },
                            { text: 'Annexure-1', style: 'subheader' },
                            { text: '1.1 Timetable related Activities ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Department', 'Semester'],
                                        [timeTable.role, timeTable.department, timeTable.semester]
                                    ]
                                }
                            },

                            { text: '1.2 Class Advisor', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Class', 'Department', 'Semester', 'Duties Performed'],
                                        [classAdvisor.class_name, classAdvisor.department, classAdvisor.semester, classAdvisor.duties]
                                    ]
                                }
                            },

                            { text: '1.3 Sports Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Sport Name', 'Category', 'Role', 'Ojus/Other College Activity '],
                                        [sportsActivities.sports_name, sportsActivities.sports_category, sportsActivities.sports_role, sportsActivities.sports_ojus_or_other]
                                    ]
                                }
                            },

                            { text: '1.4 Cultural Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Cultural Activity Name', 'Category', 'Role', 'Ojus/Other College Activity '],
                                        [culturalActivities.cultural_name, culturalActivities.cultural_category, culturalActivities.cultural_role, culturalActivities.cultural_ojus_or_other]
                                    ]
                                }
                            },

                            { text: '1.5 Project Based Learning', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Role', 'Start Date', 'End Date', 'Description'],
                                        [projectBasedLearning.pbl_subject, projectBasedLearning.pbl_role, projectBasedLearning.pbl_start_date, projectBasedLearning.pbl_end_date, projectBasedLearning.pbl_description]
                                    ]
                                }
                            },

                            { text: '1.6 UDAAN Incubation Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Area of Participation', 'Contribution', 'Start Date', 'End Date',],
                                        [udaan.udaan_subject, udaan.udaan_contribution, udaan.udaan_start_date, udaan.udaan_end_date]
                                    ]
                                }
                            },

                            { text: '1.7 Placement Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'No. of Companies visited', 'No. of Students Placed', 'Department'],
                                        [placementActivities.placement_role, placementActivities.no_of_companies, placementActivities.no_of_placed_students, placementActivities.department]
                                    ]
                                }
                            },

                            { text: '1.8 In-house Placement Activities(Trainings and Workshops)', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Trainings/Workshops conducted', 'Class', 'Department', 'No. of Students Participated'],
                                        [inhousePlacement.trainings_and_workshops, inhousePlacement.class_name, inhousePlacement.department, inhousePlacement.no_of_participants]
                                    ]
                                }
                            },

                            { text: ' 1.9 Student Organisation Activity', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Events Conducted', 'Class', 'Department', 'No. of Students Participated', 'Role', 'Duration(hrs)', 'Start Date ', 'End Date'],
                                        [studentOrganizations.student_organizations_trainings, studentOrganizations.class_name, studentOrganizations.department, studentOrganizations.no_of_participants, studentOrganizations.student_organization_role, studentOrganizations.student_event_duration, studentOrganizations.student_event_start_date, studentOrganizations.student_event_end_date]
                                    ]
                                }
                            },

                            { text: '1.10 Industrial Visit Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Class', 'Department', 'No. of Days', 'Organized By', 'Name of Company visited', 'Description', 'Duration(hrs)', 'Start Date', 'End Date'],
                                        [industrialVisitActivities.industrial_visit_role, industrialVisitActivities.class_name, industrialVisitActivities.department, industrialVisitActivities.industrial_visit_days, industrialVisitActivities.industrial_visit_organizer, industrialVisitActivities.name_of_company, industrialVisitActivities.iv_description, industrialVisitActivities.industrial_visit_hrs, industrialVisitActivities.iv_start_date, industrialVisitActivities.iv_end_date]
                                    ]
                                }
                            },

                            { text: ' 1.11 Admission Related Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Admission Duties', 'Class', 'Start Date', 'End Date'],
                                        [admissionProcessActivities.admission_role, admissionProcessActivities.admission_duties,
                                        admissionProcessActivities.admission_class, admissionProcessActivities.admission_start_date, admissionProcessActivities.admission_end_date]
                                    ]
                                }
                            },

                            { text: ' 1.12 Exam related activities(University exams Supervision)', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Exams', 'No. of morning sessions', 'No. of evening sessions', 'No. of days'],
                                        [examActivitiesSupervision.exam_role, examActivitiesSupervision.exam_name, examActivitiesSupervision.morning_sessions, examActivitiesSupervision.evening_sessions,
                                        examActivitiesSupervision.no_of_supervision_days]
                                    ]
                                }
                            },

                            { text: ' 1.13 Exam related activities(External)', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Semester', 'College/University', 'Subject', 'Total Number of Activities', 'No. of papers evaluated/revalauted', 'No. of papers moderated'],
                                        [examAssessmentExternal.exam_role_external, examAssessmentExternal.semester, examAssessmentExternal.name_of_college_university, examAssessmentExternal.exam_subject_external, examAssessmentExternal.outdoor_activities, examAssessmentExternal.papers_revaluated, examAssessmentExternal.papers_moderated]
                                    ]
                                }
                            },
                            '\n', '\n', '\n', '\n', '\n',
                            { text: ' 1.14 Exam related activities(Assessment/Oral/Practical Exams Conducted, college level)', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Semester', 'Exam Type'],
                                        [examActivitiesCollegeLevel.subject_name, examActivitiesCollegeLevel.semester, examActivitiesCollegeLevel.exam_type]
                                    ]
                                }
                            },

                            { text: ' 1.15 IT Maintenance', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Class Name', 'Description', 'Task Completed', 'Date'],
                                        [itMaintenance.class_name, itMaintenance.IT_maintenance_desc, itMaintenance.IT_maintenance_task, itMaintenance.it_maintenance_date]
                                    ]
                                }
                            },

                            { text: ' 1.16 Lakshya Related Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Activities conducted', 'Description', 'Date', 'No. of students participated'],
                                        [lakshya.lakshya_activities, lakshya.lakshya_description, lakshya.lakshya_date, lakshya.lakshya_no_of_participants]
                                    ]
                                }
                            },

                            { text: ' 1.17 Magazine/Newsletter Related Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Class Name', 'Role', 'Type', 'Year of Publication'],
                                        [magazineNewsletter.class_name, magazineNewsletter.magazine_role, magazineNewsletter.magazineNewsletter_type, magazineNewsletter.year_of_publication]
                                    ]
                                }
                            },

                            { text: ' 1.18 Conduct Of STTP', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'No. of STTPs conducted', 'Technology', 'Duration(hrs)', 'Start Date', 'End Date', 'No. of Participants', 'Department'],
                                        [sttp.sttp_role, sttp.no_of_sttp, sttp.sttp_technology, sttp.sttp_duration, sttp.sttp_start_date, sttp.sttp_end_date, sttp.sttp_participants, sttp.department]
                                    ]
                                }
                            },

                            { text: ' 1.19 Department UG Projects Undertaken', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Title', ' No. of Students'],
                                        [departmentUGProjects.dept_project_role, departmentUGProjects.project_title, departmentUGProjects.project_no_of_students]
                                    ]
                                }
                            },

                            { text: 'Annexure-2', style: 'subheader' },
                            { text: '2.1 Papers Published In National Conference', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedNationalConf.title_of_paper_published, papersPublishedNationalConf.published_date, papersPublishedNationalConf.name_of_conference, papersPublishedNationalConf.isbn_issn_number, papersPublishedNationalConf.name_of_coauthor, papersPublishedNationalConf.impact_factor, papersPublishedNationalConf.no_of_citations, papersPublishedNationalConf.rating, papersPublishedNationalConf.link]
                                    ]
                                }
                            },

                            { text: ' 2.2 Papers Published In International Conference', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedInternationalConf.title_of_paper_published, papersPublishedInternationalConf.published_date, papersPublishedInternationalConf.name_of_conference, papersPublishedInternationalConf.isbn_issn_number, papersPublishedInternationalConf.name_of_coauthor, papersPublishedInternationalConf.impact_factor, papersPublishedInternationalConf.no_of_citations, papersPublishedInternationalConf.rating, papersPublishedInternationalConf.link]
                                    ]
                                }
                            },

                            { text: ' 2.3 Papers Published In Journals', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedJournals.title_of_paper_published, papersPublishedJournals.published_date, papersPublishedJournals.name_of_conference, papersPublishedJournals.isbn_issn_number, papersPublishedJournals.name_of_coauthor, papersPublishedJournals.impact_factor, papersPublishedJournals.no_of_citations, papersPublishedJournals.rating,
                                        papersPublishedJournals.link]
                                    ]
                                }
                            },

                            { text: '2.4 MOOCS', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of courses', 'Month/Year', 'Duration(hrs)', 'Certification Completed?'],
                                        [moocs.name_of_moocs_undertaken, moocs.moocs_date, moocs.moocs_duartion, moocs.certification_status]
                                    ]
                                }
                            },

                            { text: ' 2.5 Swayam', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of courses', 'Month/Year', 'Duration(hrs)', 'Certification Completed?'],
                                        [swayam.name_of_swayam_undertaken, swayam.swayam_date, swayam.swayam_duartion, swayam.certification_status]
                                    ]
                                }
                            },

                            { text: ' 2.6 Short-Term Traning', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of STTPs Conducted', 'Techonology', 'Duration(months)', 'Start Date', 'End Date', 'Internal/External', 'Name of Institute where atteneded '],
                                        [shortTermTraining.short_term_training, shortTermTraining.techonology, shortTermTraining.duration_of_course, shortTermTraining.start_date, shortTermTraining.end_date, shortTermTraining.internal_external, shortTermTraining.name_of_institue]
                                    ]
                                }
                            },

                            { text: '2.7 Seminars', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of Seminar', 'Techonology', 'Duration(months)', 'Start Date', 'End Date', 'Internal/External', 'Name of Institute where atteneded '],
                                        [seminars.name_of_seminar, seminars.techonology, seminars.duration_of_course, seminars.start_date, seminars.end_date, seminars.internal_external, seminars.name_of_institue]
                                    ]
                                }
                            },
                            { text: 'Annexure-3', style: 'subheader' },
                            { text: ' 3.1 Resource Person in STTP/Training Course/Lecture Talks', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Topic Name', 'Department', 'Name of Institute', 'No. of Participants'],
                                        [resourcePerson.topicName, resourcePerson.department, resourcePerson.nameofInstitute, resourcePerson.numberofParticipants]
                                    ]
                                }
                            },

                            { text: '  3.2 Contribution To Syllabus Framing', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Role', 'Name of University', 'Other Details'],
                                        [contributionToSyllabus.nameofSub, contributionToSyllabus.role, contributionToSyllabus.nameofUniversity, contributionToSyllabus.otherDetails]
                                    ]
                                }
                            },

                            { text: ' 3.3 Member Of University Committe', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of Committee', 'Roles and Responsibility', 'Designation'],
                                        [memberOfUniversityCommitte.nameofCommittee, memberOfUniversityCommitte.rolesAndResponsibility, memberOfUniversityCommitte.designation]
                                    ]
                                }
                            },

                            { text: ' 3.4 Consultancy Assignment', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Roles and Responsibility', 'Type of Work/Domain', 'Organization', 'Duration', 'No. of visits'],
                                        [consultancyAssignment.rolesAndResponsilbilty, consultancyAssignment.typeOfWorkorDomain, consultancyAssignment.organization, consultancyAssignment.duration, consultancyAssignment.numberofVisits]
                                    ]
                                }
                            },


                            { text: ' 3.5 External Projects Or Competitions Participations', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Description', 'Contribution', 'University', 'Duration', 'Comments'],
                                        [externalProjectsOrCompetition.description, externalProjectsOrCompetition.contribution, externalProjectsOrCompetition.university, externalProjectsOrCompetition.duration, externalProjectsOrCompetition.comments]
                                    ]
                                }
                            },

                        ],
                        styles: {
                            header: {
                                fontSize: 18,
                                bold: true,
                                margin: [0, 0, 0, 10]
                            },
                            subheader: {
                                fontSize: 16,
                                bold: true,
                                margin: [0, 10, 0, 5]
                            },
                            tableExample: {
                                margin: [0, 5, 0, 15]
                            },
                            tableHeader: {
                                bold: true,
                                fontSize: 13,
                                color: 'black'
                            }
                        },
                        defaultStyle: {
                            // alignment: 'justify'
                        }

                    }

                    const pdfDoc = pdfMake.createPdf(document);
                    pdfDoc.getBase64(data => {
                        res.writeHead(200, {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': `attachment;filename=${facultyName}.pdf`
                        });
                        const download = Buffer.from(data.toString('utf-8'), 'base64');
                        res.end(download);
                    });
                })
        })
});

// PDF route POST for HOD
router.post('/hod/pdf/:id', (req, res) => {
    Faculty.find({ _id: req.params.id })
        .then(result => {
            facultyName = result[0].name;
            facultyEmail = result[0].email;
            var loads = [modules.TeachingLoad.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.TeachingAssistant.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.NewBooks.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.AddedExp.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.Innovation.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }),

            modules.Leave.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),

            modules.TimeTable.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ClassAdvisor.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.SportsActivities.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.CulturalActivities.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ProjectBasedLearning.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.Udaan.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.PlacementActivities.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.InhousePlacement.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.StudentOrganizations.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.IndustrialVisitActivities.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.AdmissionProcessActivities.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ExamAssessmentExternal.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ExamActivitiesSupervision.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ExamActivitiesCollegeLevel.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ITMaintenance.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.Lakshya.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.MagazineNewsletter.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.STTP.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.DepartmentUGProjects.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),

            modules.PapersPublishedNationalConf.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.PapersPublishedInternationalConf.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.PapersPublishedJournals.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.Moocs.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.Swayam.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ShortTermTraining.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.Seminars.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),

            modules.ResourcePerson.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ContributionToSyllabus.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.MemberOfUniversityCommitte.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ConsultancyAssignment.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec(),
            modules.ExternalProjectsOrCompetition.findOne({ $and: [{ user: req.params.id }, { academic_year: year }] }).exec()
            ];

            Promise.all(loads)
                .then(result => {
                    return Promise.all(result);
                })
                .then(([teachingLoad, teachingAssistant, newBooks, addedExp, innovation,
                    leave,
                    timeTable, classAdvisor, sportsActivities, culturalActivities, projectBasedLearning, udaan, placementActivities, inhousePlacement, studentOrganizations, industrialVisitActivities, admissionProcessActivities, examAssessmentExternal, examActivitiesSupervision, examActivitiesCollegeLevel, itMaintenance, lakshya, magazineNewsletter, sttp, departmentUGProjects,
                    papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars,
                    resourcePerson, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition]) => {
                    if (!teachingAssistant) { teachingAssistant = { faculty_name: '-', class: '-', semester: '-', subject: '-' } }
                    if (!newBooks) { newBooks = { subject_name: '-', title: '-', semester: '-', class: '-', publication: '-', author: '-' } }
                    if (!addedExp) { addedExp = { subject_name: '-', class: '-', semester: '-', exp_name: '-' } }
                    if (!innovation) { innovation = { subject_name: '-', class_name: '-', semester: '-', technique: '-' } }
                    if (!leave) { leave = { pre_casual_leave: '-', pre_outdoor_leave: '-', pre_medical_leave: '-', pre_special_leave: '-', post_casual_leave: '-', post_outdoor_leave: '-', post_medical_leave: '-', post_special_leave: '-' } }
                    if (!timeTable) { timeTable = { role: '-', department: '-', semester: '-' } }
                    if (!classAdvisor) { classAdvisor = { class_name: '-', department: '-', semester: '-', duties: '-' } }
                    if (!sportsActivities) { sportsActivities = { sports_name: '-', sports_category: '-', sports_role: '-', sports_ojus_or_other: '-' } }
                    if (!culturalActivities) { culturalActivities = { cultural_name: '-', cultural_category: '-', cultural_role: '-', cultural_ojus_or_other: '-' } }
                    if (!projectBasedLearning) { projectBasedLearning = { pbl_subject: '-', pbl_role: '-', pbl_start_date: '-', pbl_end_date: '-', pbl_description: '-' } }
                    if (!udaan) { udaan = { udaan_subject: '-', udaan_contribution: '-', udaan_start_date: '-', udaan_end_date: '-' } }
                    if (!placementActivities) { placementActivities = { placement_role: '-', no_of_companies: '-', no_of_placed_students: '-', department: '-' } }
                    if (!inhousePlacement) { inhousePlacement = { trainings_and_workshops: '-', class_name: '-', department: '-', no_of_participants: '-' } }
                    if (!studentOrganizations) { studentOrganizations = { student_organizations_trainings: '-', class_name: '-', department: '-', no_of_participants: '-', student_organization_role: '-', student_event_duration: '-', student_event_start_date: '-', student_event_end_date: '-' } }
                    if (!industrialVisitActivities) { industrialVisitActivities = { industrial_visit_role: '-', class_name: '-', department: '-', industrial_visit_days: '-', industrial_visit_organizer: '-', name_of_company: '-', iv_description: '-', industrial_visit_hrs: '-', iv_start_date: '-', iv_end_date: '-' } }
                    if (!admissionProcessActivities) { admissionProcessActivities = { admission_role: '-', admission_duties: '-', admission_class: '-', admission_start_date: '-', admission_end_date: '-' } }
                    if (!examAssessmentExternal) { examAssessmentExternal = { exam_role_external: '-', semester: '-', name_of_college_university: '-', exam_subject_external: '-', outdoor_activities: '-', papers_revaluated: '-', papers_moderated: '-' } }
                    if (!examActivitiesSupervision) { examActivitiesSupervision = { exam_role: '-', exam_name: '-', morning_sessions: '-', evening_sessions: '-', no_of_supervision_days: '-' } }
                    if (!examActivitiesCollegeLevel) { examActivitiesCollegeLevel = { subject_name: '-', semester: '-', exam_type: '-' } }
                    if (!itMaintenance) { itMaintenance = { class_name: '-', IT_maintenance_desc: '-', IT_maintenance_task: '-', it_maintenance_date: '-' } }
                    if (!lakshya) { lakshya = { lakshya_activities: '-', lakshya_description: '-', lakshya_date: '-', lakshya_no_of_participants: '-' } }
                    if (!magazineNewsletter) { magazineNewsletter = { class_name: '-', magazine_role: '-', magazineNewsletter_type: '-', year_of_publication: '-' } }
                    if (!sttp) { sttp = { sttp_role: '-', no_of_sttp: '-', sttp_technology: '-', sttp_duration: '-', sttp_start_date: '-', sttp_end_date: '-', sttp_participants: '-', department: '-' } }
                    if (!departmentUGProjects) { departmentUGProjects = { dept_project_role: '-', project_title: '-', project_no_of_students: '-' } }
                    if (!papersPublishedNationalConf) { papersPublishedNationalConf = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!papersPublishedInternationalConf) { papersPublishedInternationalConf = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!papersPublishedJournals) { papersPublishedJournals = { title_of_paper_published: '-', published_date: '-', name_of_conference: '-', isbn_issn_number: '-', name_of_coauthor: '-', impact_factor: '-', no_of_citations: '-', rating: '-', link: '-' } }
                    if (!moocs) { moocs = { name_of_moocs_undertaken: '-', moocs_date: '-', moocs_duartion: '-', certification_status: '-' } }
                    if (!swayam) { swayam = { name_of_swayam_undertaken: '-', swayam_date: '-', swayam_duartion: '-', certification_status: '-' } }
                    if (!shortTermTraining) { shortTermTraining = { short_term_training: '-', techonology: '-', duration_of_course: '-', start_date: '-', end_date: '-', internal_external: '-', name_of_institue: '-' } }
                    if (!seminars) { seminars = { name_of_seminar: '-', techonology: '-', duration_of_course: '-', start_date: '-', end_date: '-', internal_external: '-', name_of_institue: '-' } }
                    if (!resourcePerson) { resourcePerson = { topicName: '-', department: '-', nameofInstitute: '-', numberofParticipants: '-' } }
                    if (!contributionToSyllabus) { contributionToSyllabus = { nameofSub: '-', role: '-', nameofUniversity: '-', otherDetails: '-' } }
                    if (!memberOfUniversityCommitte) { memberOfUniversityCommitte = { nameofCommittee: '-', rolesAndResponsibility: '-', designation: '-' } }
                    if (!consultancyAssignment) { consultancyAssignment = { rolesAndResponsilbilty: '-', typeOfWorkorDomain: '-', organization: '-', duration: '-', numberofVisits: '-' } }
                    if (!externalProjectsOrCompetition) { externalProjectsOrCompetition = { description: '-', contribution: '-', university: '-', duration: '-', comments: '-' } }

                    document = {
                        content: [
                            { text: 'Self Appraisal Report', style: 'header' },
                            { text: 'Academic Year: ' + teachingLoad.academic_year, style: 'header' },

                            'Name: ' + facultyName + '\n',
                            'Email ID: ' + facultyEmail + '\n',

                            { text: 'Academic Performance', style: 'subheader' },
                            { text: '1. Teaching Load', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Class', 'Department', 'Semester', 'Theory Load', 'Lab Load', 'Tutorials Load ', 'Theory sessions', 'Practical Sessions', 'Feedback'],
                                        [teachingLoad.subject_name, teachingLoad.class, teachingLoad.department, teachingLoad.semester, teachingLoad.theory_subject, teachingLoad.lab_subject, teachingLoad.tutorials, teachingLoad.theory_session, teachingLoad.practical_session, teachingLoad.Student_feedback]
                                    ]
                                }
                            },

                            { text: '2. Teaching Assistant', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['TA Name', 'Class', 'Semester', 'Subject Contribution'],
                                        [teachingAssistant.faculty_name, teachingAssistant.class, teachingAssistant.semester, teachingAssistant.subject]
                                    ]
                                }
                            },

                            { text: '3. New Books Suggested to Library', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Class', 'Semester', 'Title', 'Publication', 'Author '],
                                        [newBooks.subject_name, newBooks.class, newBooks.semester, newBooks.title, newBooks.publication, newBooks.author]
                                    ]
                                }
                            },

                            { text: '4. Additional Experiments added to lab manual', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Class', 'Semester', 'Experiment Name'],
                                        [addedExp.subject_name, addedExp.class, addedExp.semester, addedExp.exp_name]
                                    ]
                                }
                            },

                            { text: '5. Innovative Teaching Technique Adopted', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Class', 'Semester', 'Technique Adopted'],

                                        [innovation.subject_name, innovation.class_name, innovation.semester, innovation.technique]
                                    ]
                                }
                            },
                            { text: 'Leave Record', style: 'subheader' },
                            { text: '1. Pre-Sanctioned Leave Record', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Causal Leave', 'Outdoor Leave', 'Medical Leave', 'Special Leave'],
                                        [leave.pre_casual_leave, leave.pre_outdoor_leave, leave.pre_medical_leave, leave.pre_special_leave]
                                    ]
                                }
                            },
                            { text: '1. Post-Sanctioned Leave Record', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Causal Leave', 'Outdoor Leave', 'Medical Leave', 'Special Leave'],
                                        [leave.post_casual_leave, leave.post_outdoor_leave, leave.post_medical_leave, leave.post_special_leave]
                                    ]
                                }
                            },
                            { text: 'Annexure-1', style: 'subheader' },
                            { text: '1.1 Timetable related Activities ', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Department', 'Semester'],
                                        [timeTable.role, timeTable.department, timeTable.semester]
                                    ]
                                }
                            },

                            { text: '1.2 Class Advisor', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Class', 'Department', 'Semester', 'Duties Performed'],
                                        [classAdvisor.class_name, classAdvisor.department, classAdvisor.semester, classAdvisor.duties]
                                    ]
                                }
                            },

                            { text: '1.3 Sports Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Sport Name', 'Category', 'Role', 'Ojus/Other College Activity '],
                                        [sportsActivities.sports_name, sportsActivities.sports_category, sportsActivities.sports_role, sportsActivities.sports_ojus_or_other]
                                    ]
                                }
                            },

                            { text: '1.4 Cultural Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Cultural Activity Name', 'Category', 'Role', 'Ojus/Other College Activity '],
                                        [culturalActivities.cultural_name, culturalActivities.cultural_category, culturalActivities.cultural_role, culturalActivities.cultural_ojus_or_other]
                                    ]
                                }
                            },

                            { text: '1.5 Project Based Learning', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Role', 'Start Date', 'End Date', 'Description'],
                                        [projectBasedLearning.pbl_subject, projectBasedLearning.pbl_role, projectBasedLearning.pbl_start_date, projectBasedLearning.pbl_end_date, projectBasedLearning.pbl_description]
                                    ]
                                }
                            },

                            { text: '1.6 UDAAN Incubation Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Area of Participation', 'Contribution', 'Start Date', 'End Date',],
                                        [udaan.udaan_subject, udaan.udaan_contribution, udaan.udaan_start_date, udaan.udaan_end_date]
                                    ]
                                }
                            },

                            { text: '1.7 Placement Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'No. of Companies visited', 'No. of Students Placed', 'Department'],
                                        [placementActivities.placement_role, placementActivities.no_of_companies, placementActivities.no_of_placed_students, placementActivities.department]
                                    ]
                                }
                            },

                            { text: '1.8 In-house Placement Activities(Trainings and Workshops)', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Trainings/Workshops conducted', 'Class', 'Department', 'No. of Students Participated'],
                                        [inhousePlacement.trainings_and_workshops, inhousePlacement.class_name, inhousePlacement.department, inhousePlacement.no_of_participants]
                                    ]
                                }
                            },

                            { text: ' 1.9 Student Organisation Activity', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Events Conducted', 'Class', 'Department', 'No. of Students Participated', 'Role', 'Duration(hrs)', 'Start Date ', 'End Date'],
                                        [studentOrganizations.student_organizations_trainings, studentOrganizations.class_name, studentOrganizations.department, studentOrganizations.no_of_participants, studentOrganizations.student_organization_role, studentOrganizations.student_event_duration, studentOrganizations.student_event_start_date, studentOrganizations.student_event_end_date]
                                    ]
                                }
                            },

                            { text: '1.10 Industrial Visit Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Class', 'Department', 'No. of Days', 'Organized By', 'Name of Company visited', 'Description', 'Duration(hrs)', 'Start Date', 'End Date'],
                                        [industrialVisitActivities.industrial_visit_role, industrialVisitActivities.class_name, industrialVisitActivities.department, industrialVisitActivities.industrial_visit_days, industrialVisitActivities.industrial_visit_organizer, industrialVisitActivities.name_of_company, industrialVisitActivities.iv_description, industrialVisitActivities.industrial_visit_hrs, industrialVisitActivities.iv_start_date, industrialVisitActivities.iv_end_date]
                                    ]
                                }
                            },

                            { text: ' 1.11 Admission Related Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Admission Duties', 'Class', 'Start Date', 'End Date'],
                                        [admissionProcessActivities.admission_role, admissionProcessActivities.admission_duties,
                                        admissionProcessActivities.admission_class, admissionProcessActivities.admission_start_date, admissionProcessActivities.admission_end_date]
                                    ]
                                }
                            },

                            { text: ' 1.12 Exam related activities(University exams Supervision)', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Exams', 'No. of morning sessions', 'No. of evening sessions', 'No. of days'],
                                        [examActivitiesSupervision.exam_role, examActivitiesSupervision.exam_name, examActivitiesSupervision.morning_sessions, examActivitiesSupervision.evening_sessions,
                                        examActivitiesSupervision.no_of_supervision_days]
                                    ]
                                }
                            },

                            { text: ' 1.13 Exam related activities(External)', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Semester', 'College/University', 'Subject', 'Total Number of Activities', 'No. of papers evaluated/revalauted', 'No. of papers moderated'],
                                        [examAssessmentExternal.exam_role_external, examAssessmentExternal.semester, examAssessmentExternal.name_of_college_university, examAssessmentExternal.exam_subject_external, examAssessmentExternal.outdoor_activities, examAssessmentExternal.papers_revaluated, examAssessmentExternal.papers_moderated]
                                    ]
                                }
                            },
                            '\n', '\n', '\n', '\n', '\n',
                            { text: ' 1.14 Exam related activities(Assessment/Oral/Practical Exams Conducted, college level)', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Semester', 'Exam Type'],
                                        [examActivitiesCollegeLevel.subject_name, examActivitiesCollegeLevel.semester, examActivitiesCollegeLevel.exam_type]
                                    ]
                                }
                            },

                            { text: ' 1.15 IT Maintenance', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Class Name', 'Description', 'Task Completed', 'Date'],
                                        [itMaintenance.class_name, itMaintenance.IT_maintenance_desc, itMaintenance.IT_maintenance_task, itMaintenance.it_maintenance_date]
                                    ]
                                }
                            },

                            { text: ' 1.16 Lakshya Related Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Activities conducted', 'Description', 'Date', 'No. of students participated'],
                                        [lakshya.lakshya_activities, lakshya.lakshya_description, lakshya.lakshya_date, lakshya.lakshya_no_of_participants]
                                    ]
                                }
                            },

                            { text: ' 1.17 Magazine/Newsletter Related Activities', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Class Name', 'Role', 'Type', 'Year of Publication'],
                                        [magazineNewsletter.class_name, magazineNewsletter.magazine_role, magazineNewsletter.magazineNewsletter_type, magazineNewsletter.year_of_publication]
                                    ]
                                }
                            },

                            { text: ' 1.18 Conduct Of STTP', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'No. of STTPs conducted', 'Technology', 'Duration(hrs)', 'Start Date', 'End Date', 'No. of Participants', 'Department'],
                                        [sttp.sttp_role, sttp.no_of_sttp, sttp.sttp_technology, sttp.sttp_duration, sttp.sttp_start_date, sttp.sttp_end_date, sttp.sttp_participants, sttp.department]
                                    ]
                                }
                            },

                            { text: ' 1.19 Department UG Projects Undertaken', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Role', 'Title', ' No. of Students'],
                                        [departmentUGProjects.dept_project_role, departmentUGProjects.project_title, departmentUGProjects.project_no_of_students]
                                    ]
                                }
                            },

                            { text: 'Annexure-2', style: 'subheader' },
                            { text: '2.1 Papers Published In National Conference', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedNationalConf.title_of_paper_published, papersPublishedNationalConf.published_date, papersPublishedNationalConf.name_of_conference, papersPublishedNationalConf.isbn_issn_number, papersPublishedNationalConf.name_of_coauthor, papersPublishedNationalConf.impact_factor, papersPublishedNationalConf.no_of_citations, papersPublishedNationalConf.rating, papersPublishedNationalConf.link]
                                    ]
                                }
                            },

                            { text: ' 2.2 Papers Published In International Conference', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedInternationalConf.title_of_paper_published, papersPublishedInternationalConf.published_date, papersPublishedInternationalConf.name_of_conference, papersPublishedInternationalConf.isbn_issn_number, papersPublishedInternationalConf.name_of_coauthor, papersPublishedInternationalConf.impact_factor, papersPublishedInternationalConf.no_of_citations, papersPublishedInternationalConf.rating, papersPublishedInternationalConf.link]
                                    ]
                                }
                            },

                            { text: ' 2.3 Papers Published In Journals', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Title of Paper', 'Month/Year', 'Name of Conference', 'ISBN/ISSN Number', 'Name of co-authors', 'Impact Factor of Conference', 'No. of citations ', 'Rating', 'Online Link'],
                                        [papersPublishedJournals.title_of_paper_published, papersPublishedJournals.published_date, papersPublishedJournals.name_of_conference, papersPublishedJournals.isbn_issn_number, papersPublishedJournals.name_of_coauthor, papersPublishedJournals.impact_factor, papersPublishedJournals.no_of_citations, papersPublishedJournals.rating,
                                        papersPublishedJournals.link]
                                    ]
                                }
                            },

                            { text: '2.4 MOOCS', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of courses', 'Month/Year', 'Duration(hrs)', 'Certification Completed?'],
                                        [moocs.name_of_moocs_undertaken, moocs.moocs_date, moocs.moocs_duartion, moocs.certification_status]
                                    ]
                                }
                            },

                            { text: ' 2.5 Swayam', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of courses', 'Month/Year', 'Duration(hrs)', 'Certification Completed?'],
                                        [swayam.name_of_swayam_undertaken, swayam.swayam_date, swayam.swayam_duartion, swayam.certification_status]
                                    ]
                                }
                            },

                            { text: ' 2.6 Short-Term Traning', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of STTPs Conducted', 'Techonology', 'Duration(months)', 'Start Date', 'End Date', 'Internal/External', 'Name of Institute where atteneded '],
                                        [shortTermTraining.short_term_training, shortTermTraining.techonology, shortTermTraining.duration_of_course, shortTermTraining.start_date, shortTermTraining.end_date, shortTermTraining.internal_external, shortTermTraining.name_of_institue]
                                    ]
                                }
                            },

                            { text: '2.7 Seminars', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of Seminar', 'Techonology', 'Duration(months)', 'Start Date', 'End Date', 'Internal/External', 'Name of Institute where atteneded '],
                                        [seminars.name_of_seminar, seminars.techonology, seminars.duration_of_course, seminars.start_date, seminars.end_date, seminars.internal_external, seminars.name_of_institue]
                                    ]
                                }
                            },
                            { text: 'Annexure-3', style: 'subheader' },
                            { text: ' 3.1 Resource Person in STTP/Training Course/Lecture Talks', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Topic Name', 'Department', 'Name of Institute', 'No. of Participants'],
                                        [resourcePerson.topicName, resourcePerson.department, resourcePerson.nameofInstitute, resourcePerson.numberofParticipants]
                                    ]
                                }
                            },

                            { text: '  3.2 Contribution To Syllabus Framing', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Subject Name', 'Role', 'Name of University', 'Other Details'],
                                        [contributionToSyllabus.nameofSub, contributionToSyllabus.role, contributionToSyllabus.nameofUniversity, contributionToSyllabus.otherDetails]
                                    ]
                                }
                            },

                            { text: ' 3.3 Member Of University Committe', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Name of Committee', 'Roles and Responsibility', 'Designation'],
                                        [memberOfUniversityCommitte.nameofCommittee, memberOfUniversityCommitte.rolesAndResponsibility, memberOfUniversityCommitte.designation]
                                    ]
                                }
                            },

                            { text: ' 3.4 Consultancy Assignment', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Roles and Responsibility', 'Type of Work/Domain', 'Organization', 'Duration', 'No. of visits'],
                                        [consultancyAssignment.rolesAndResponsilbilty, consultancyAssignment.typeOfWorkorDomain, consultancyAssignment.organization, consultancyAssignment.duration, consultancyAssignment.numberofVisits]
                                    ]
                                }
                            },


                            { text: ' 3.5 External Projects Or Competitions Participations', style: 'subheader' },

                            {
                                style: 'tableExample',
                                table: {
                                    body: [
                                        ['Description', 'Contribution', 'University', 'Duration', 'Comments'],
                                        [externalProjectsOrCompetition.description, externalProjectsOrCompetition.contribution, externalProjectsOrCompetition.university, externalProjectsOrCompetition.duration, externalProjectsOrCompetition.comments]
                                    ]
                                }
                            },

                        ],
                        styles: {
                            header: {
                                fontSize: 18,
                                bold: true,
                                margin: [0, 0, 0, 10]
                            },
                            subheader: {
                                fontSize: 16,
                                bold: true,
                                margin: [0, 10, 0, 5]
                            },
                            tableExample: {
                                margin: [0, 5, 0, 15]
                            },
                            tableHeader: {
                                bold: true,
                                fontSize: 13,
                                color: 'black'
                            }
                        },
                        defaultStyle: {
                            // alignment: 'justify'
                        }

                    }

                    const pdfDoc = pdfMake.createPdf(document);
                    pdfDoc.getBase64(data => {
                        res.writeHead(200, {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': `attachment;filename=${facultyName}.pdf`
                        });
                        const download = Buffer.from(data.toString('utf-8'), 'base64');
                        res.end(download);
                    });
                })
        })
});

router.get('/hod/home', ensureAuthenticated, (req, res) => {
    let facultyDetails;
    Hod.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                Faculty.find({})
                    .sort({ date: 'desc' })
                    .then(result => {
                        facultyDetails = result;
                        res.render('users/hod/home', {
                            faculty: result
                        });
                    })
            }
        })
});

var facultyAP, facultyLeave, facultyA1, facultyA2, facultyA3;
router.post('/hod/finalSubmit/:id/:year', (req, res) => {

    let errors = [];
    if (req.body.value1 == '' || req.body.value2 == '' || req.body.value3 == '' || req.body.value4 == '' || req.body.value5 == '') {
        errors.push({ text: 'Please mark all the buttons' });
    } else {
        const faculty = Faculty.find({ _id: req.params.id }).exec();
        const facultymarks = FacultyMarks.find({ $and: [{ user: req.params.id }, { academic_year: req.params.year }] }).exec();
        Promise.all([faculty, facultymarks]).then(result => {
            return Promise.all(result);
        }).then(([result, facultymarks]) => {
            facultyName = result[0].name;
            facultyEmail = result[0].email;
            facultyAP = facultymarks[0].academicPerformance;
            facultyLeave = facultymarks[0].leaveRecord;
            facultyA1 = facultymarks[0].annexure_1;
            facultyA2 = facultymarks[0].annexure_2;
            facultyA3 = facultymarks[0].annexure_3;

            let fianlValue = +req.body.value1 + +req.body.value2 + +req.body.value3 + +req.body.value4 + +req.body.value5
            // console.log(facultyName);
            // console.log(facultyEmail);
            const finalSubmitData = {
                academic_year: year,
                faculty_name: facultyName,
                faculty_email: facultyEmail,
                academicPerformance: req.body.academicPerformance,
                leaveRecord: req.body.leaveRecord,
                annexure_1: req.body.annexure_1,
                annexure_2: req.body.annexure_2,
                annexure_3: req.body.annexure_3,
                confidential: fianlValue,
                facultyAP: facultyAP,
                facultyLeave: facultyLeave,
                facultyA1: facultyA1,
                facultyA2: facultyA2,
                facultyA3: facultyA3,
                user: facultID
            }
            new HodMarks(finalSubmitData)
                .save()
                .then(confidential_form => {
                    req.flash('success_msg', 'Marks added successfully');
                    res.redirect('/users/hod/home');
                })
        })
    }
});

// Register faculty
router.get('/hod/registerFaculty', ensureAuthenticated, (req, res) => {
    Hod.findOne({ _id: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('back');
            } else {
                res.render('users/hod/registerFaculty');
            }
        })
});

// Register Form POST
router.post('/registerFaculty', (req, res) => {
        let errors = [];
        if (req.body.password != req.body.password2) {
            errors.push({ text: 'Password do not match' });
        }
        if (req.body.password.length < 4) {
            errors.push({ text: 'Password must be atleast 4 characters' });
        }
        if (errors.length > 0) {
            res.render('users/hod/registerFaculty', {
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
                        res.redirect('/users/hod/registerFaculty');
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
                                        req.flash('success_msg', 'New user added to the appraisal system');
                                        res.redirect('/users/hod/registerFaculty')
                                    });
                            });
                        });
                    }
                })
        }
});

// mangament user creation 
router.get('/management/registerUser', ensureAuthenticated, (req, res) => {
    Manager.findOne({ _id: req.user.id })
    .then(result => {
        if(!result) {
            req.flash('error_msg', 'Not Authorized');
            res.redirect('back');
        } else {
            res.render('users/management/registerUser');
        }
    }).catch(() => {
        req.flash('error_msg', 'Not Authorized');
        res.redirect('back');
    })
});

// Post route for user creation by manager
router.post('/management/registerUser', (req, res) => {
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
            res.render('users/management/registerUser', {
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
                        res.redirect('/users/management/registerUser');
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
                                        req.flash('success_msg', 'New user added to the appraisal system as faculty');
                                        res.redirect('/users/management/registerUser')
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
            res.render('users/management/registerUser', {
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
                        res.redirect('/users/management/registerUser');
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
                                        req.flash('success_msg', 'New user added to the appraisal system as HoD');
                                        res.redirect('/users/management/registerUser')
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        return;
                                    });
                            });
                        });
                    }
                });
        }
    }
});

// reset route faculty
router.get('/faculty/forgot', (req, res) => {
    res.render('users/faculty/forgot');
});

router.get('/faculty/reset', (req, res) => {
    res.render('users/faculty/reset');
});

// reset route hod
router.get('/hod/forgot', (req, res) => {
    res.render('users/hod/forgot');
});

router.get('/hod/reset', (req, res) => {
    res.render('users/hod/reset');
});

// reset route management
router.get('/manager/forgot', (req, res) => {
    res.render('users/management/forgot');
});

router.get('/manager/reset', (req, res) => {
    res.render('users/management/reset');
});

// Logout user
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

module.exports = router;