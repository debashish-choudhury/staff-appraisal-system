const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

var modules = require('../config/modules');

mongoose.Promise = global.Promise;

let facultID;
let facultyName;
let facultyEmail;

// Load faculty model
require('../models/Users/Faculty');
const Faculty = mongoose.model('users');

// Load faculty model
require('../models/Users/FacultyProfile');
const FacultyProfile = mongoose.model('faculty_profile');

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

// User register form
router.get('/register', (req, res) => {
    res.render('users/register');
});

// faculty user login form
router.get('/faculty/login', (req, res) => {
    res.render('users/faculty/login');
});

router.get('/management/login', (req, res) => {
    res.render('users/management/login');
});

router.get('/faculty/facultyOverview', ensureAuthenticated, (req, res) => {
    let finalResult;
    FacultyMarks.find({ user: req.user.id })
        .then(result => {

            finalResult = result;
            var loads = [modules.TeachingLoad.findOne({ user: req.user.id }).exec(),
            modules.TeachingAssistant.findOne({ user: req.user.id }).exec(),
            modules.NewBooks.findOne({ user: req.user.id }).exec(),
            modules.AddedExp.findOne({ user: req.user.id }).exec(),
            modules.Innovation.findOne({ user: req.user.id }).exec(),

            modules.Leave.findOne({ user: req.user.id }).exec(),

            modules.TimeTable.findOne({ user: req.user.id }).exec(),
            modules.ClassAdvisor.findOne({ user: req.user.id }).exec(),
            modules.SportsActivities.findOne({ user: req.user.id }).exec(),
            modules.CulturalActivities.findOne({ user: req.user.id }).exec(),
            modules.ProjectBasedLearning.findOne({ user: req.user.id }).exec(),
            modules.Udaan.findOne({ user: req.user.id }).exec(),
            modules.PlacementActivities.findOne({ user: req.user.id }).exec(),
            modules.InhousePlacement.findOne({ user: req.user.id }).exec(),
            modules.StudentOrganizations.findOne({ user: req.user.id }).exec(),
            modules.IndustrialVisitActivities.findOne({ user: req.user.id }).exec(),
            modules.AdmissionProcessActivities.findOne({ user: req.user.id }).exec(),
            modules.ExamAssessmentExternal.findOne({ user: req.user.id }).exec(),
            modules.ExamActivitiesSupervision.findOne({ user: req.user.id }).exec(),
            modules.ExamActivitiesCollegeLevel.findOne({ user: req.user.id }).exec(),
            modules.ITMaintenance.findOne({ user: req.user.id }).exec(),
            modules.Lakshya.findOne({ user: req.user.id }).exec(),
            modules.MagazineNewsletter.findOne({ user: req.user.id }).exec(),
            modules.STTP.findOne({ user: req.user.id }).exec(),
            modules.DepartmentUGProjects.findOne({ user: req.user.id }).exec(),

            modules.PapersPublishedNationalConf.findOne({ user: req.user.id }).exec(),
            modules.PapersPublishedInternationalConf.findOne({ user: req.user.id }).exec(),
            modules.PapersPublishedJournals.findOne({ user: req.user.id }).exec(),
            modules.Moocs.findOne({ user: req.user.id }).exec(),
            modules.Swayam.findOne({ user: req.user.id }).exec(),
            modules.ShortTermTraining.findOne({ user: req.user.id }).exec(),
            modules.Seminars.findOne({ user: req.user.id }).exec(),

            modules.ResourcePerson.findOne({ user: req.user.id }).exec(),
            modules.ContributionToSyllabus.findOne({ user: req.user.id }).exec(),
            modules.MemberOfUniversityCommitte.findOne({ user: req.user.id }).exec(),
            modules.ConsultancyAssignment.findOne({ user: req.user.id }).exec(),
            modules.ExternalProjectsOrCompetition.findOne({ user: req.user.id }).exec()
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
            .then(() => {
                req.flash('success_msg', 'Successfully added marks for evaluation');
                res.redirect('/users/faculty/facultyOverview');
            })
            .catch(err => {
                if (err) throw err;
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
router.get('/hod/hodOverview/:id', ensureAuthenticated, (req, res) => {
    let finalResult;
    FacultyMarks.find({ user: req.params.id })
        .then(marks => {
            finalResult = marks;
            facultID = marks[0].user;

            //console.log(facultID);
            //console.log(finalResult);
            var loads = [modules.TeachingLoad.findOne({ user: facultID }).exec(),
            modules.TeachingAssistant.findOne({ user: facultID }).exec(),
            modules.NewBooks.findOne({ user: facultID }).exec(),
            modules.AddedExp.findOne({ user: facultID }).exec(),
            modules.Innovation.findOne({ user: facultID }).exec(),

            modules.Leave.findOne({ user: facultID }).exec(),

            modules.TimeTable.findOne({ user: facultID }).exec(),
            modules.ClassAdvisor.findOne({ user: facultID }).exec(),
            modules.SportsActivities.findOne({ user: facultID }).exec(),
            modules.CulturalActivities.findOne({ user: facultID }).exec(),
            modules.ProjectBasedLearning.findOne({ user: facultID }).exec(),
            modules.Udaan.findOne({ user: facultID }).exec(),
            modules.PlacementActivities.findOne({ user: facultID }).exec(),
            modules.InhousePlacement.findOne({ user: facultID }).exec(),
            modules.StudentOrganizations.findOne({ user: facultID }).exec(),
            modules.IndustrialVisitActivities.findOne({ user: facultID }).exec(),
            modules.AdmissionProcessActivities.findOne({ user: facultID }).exec(),
            modules.ExamAssessmentExternal.findOne({ user: facultID }).exec(),
            modules.ExamActivitiesSupervision.findOne({ user: facultID }).exec(),
            modules.ExamActivitiesCollegeLevel.findOne({ user: facultID }).exec(),
            modules.ITMaintenance.findOne({ user: facultID }).exec(),
            modules.Lakshya.findOne({ user: facultID }).exec(),
            modules.MagazineNewsletter.findOne({ user: facultID }).exec(),
            modules.STTP.findOne({ user: facultID }).exec(),
            modules.DepartmentUGProjects.findOne({ user: facultID }).exec(),

            modules.PapersPublishedNationalConf.findOne({ user: facultID }).exec(),
            modules.PapersPublishedInternationalConf.findOne({ user: facultID }).exec(),
            modules.PapersPublishedJournals.findOne({ user: facultID }).exec(),
            modules.Moocs.findOne({ user: facultID }).exec(),
            modules.Swayam.findOne({ user: facultID }).exec(),
            modules.ShortTermTraining.findOne({ user: facultID }).exec(),
            modules.Seminars.findOne({ user: facultID }).exec(),

            modules.ResourcePerson.findOne({ user: facultID }).exec(),
            modules.ContributionToSyllabus.findOne({ user: facultID }).exec(),
            modules.MemberOfUniversityCommitte.findOne({ user: facultID }).exec(),
            modules.ConsultancyAssignment.findOne({ user: facultID }).exec(),
            modules.ExternalProjectsOrCompetition.findOne({ user: facultID }).exec(),

            HodMarks.findOne({ user: facultID }).exec()
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

                    res.render('users/hod/hodOverview', { finalResult, teachingLoad, teachingAssistant, newBooks, addedExp, innovation, leave, timeTable, classAdvisor, sportsActivities, culturalActivities, projectBasedLearning, udaan, placementActivities, inhousePlacement, studentOrganizations, industrialVisitActivities, admissionProcessActivities, examAssessmentExternal, examActivitiesSupervision, examActivitiesCollegeLevel, itMaintenance, lakshya, magazineNewsletter, sttp, departmentUGProjects, papersPublishedNationalConf, papersPublishedInternationalConf, papersPublishedJournals, moocs, swayam, shortTermTraining, seminars, resourcePerson, contributionToSyllabus, memberOfUniversityCommitte, consultancyAssignment, externalProjectsOrCompetition, hodMarks });
                })

        })
        .catch(err => {
            if (err) {
                req.flash('error_msg', 'not submitted the form');
                res.redirect('/users/hod/home');
            }
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

router.post('/management/login',
    passport.authenticate('management_user', { successRedirect: '/users/management/home', failureRedirect: '/users/management/login', failureFlash: true }));

router.get('/hod/home', ensureAuthenticated, (req, res) => {
    const facultyRegistered = Faculty.find({}).exec();
    const facultyMarks = FacultyMarks.find({}).limit(1).exec();
    Promise.all([facultyRegistered, facultyMarks]).then(result => {
        // return Promise.all(result.map(r => JSON.stringify(r)));
        return Promise.all(result);
    }).then(([faculty, marks]) => {
        // console.log(faculty);
        // console.log(marks);
        facultID = marks[0].user;
        res.render('users/hod/home', {
            faculty: faculty
        });
    });
});

router.get('/management/home', ensureAuthenticated, (req, res) => {
    HodMarks.find({})
    .sort({date: 'desc'})
    .then(result => {
        if(!result) {
            req.flash('error_msg', 'No submissions yet.');
            res.redirect('/users/management/home');
        } else {
            res.render('users/management/home', {result});
        }
    })
});

router.get('/hod/appraisalList', (req, res) => {
    HodMarks.find({})
    .sort({date: 'desc'})
    .then(result => {
        if(!result) {
            req.flash('error_msg', 'No submissions yet.');
            res.redirect('/users/hod/home');
        } else {
            res.render('users/hod/appraisalList', {result});
        }
    })
});

router.post('/hod/finalSubmit/:id', (req, res) => {
    let errors = [];
    if (req.body.value1 == '' || req.body.value2 == '' || req.body.value3 == '' || req.body.value4 == '' || req.body.value5 == '') {
        errors.push({ text: 'Please mark all the buttons' });
    } else {
        Faculty.find({ _id: req.params.id }).exec()
            .then(result => {
                facultyName = result[0].name;
                facultyEmail = result[0].email;
                let fianlValue = +req.body.value1 + +req.body.value2 + +req.body.value3 + +req.body.value4 + +req.body.value5
                // console.log(facultyName);
                // console.log(facultyEmail);
                const finalSubmitData = {
                    faculty_name: facultyName,
                    faculty_email: facultyEmail,
                    academicPerformance: req.body.academicPerformance,
                    leaveRecord: req.body.leaveRecord,
                    annexure_1: req.body.annexure_1,
                    annexure_2: req.body.annexure_2,
                    annexure_3: req.body.annexure_3,
                    confidential: fianlValue,
                    user: facultID
                }
                new HodMarks(finalSubmitData)
                    .save()
                    .then(confidential_form => {
                        req.flash('success_msg', 'Marks added successfully');
                        res.redirect('/users/hod/home');
                    })
                    .catch(err => {
                        if (err) throw err;
                    })
            })
            .catch(err => {
                if (err) throw err;
            });
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