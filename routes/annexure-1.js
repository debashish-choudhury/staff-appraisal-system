const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

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

// Load indutrial visit activities model
require('../models/Annexure-1/IndustrialVisitActivities')
const IndustrialVisitActivities = mongoose.model('industrialvisit');

// Load admission process activities model
require('../models/Annexure-1/AdmissionProcessActivities')
const AdmissionProcessActivities = mongoose.model('admissionprocess');

// Load exam assessment external model
require('../models/Annexure-1/ExamAssessmentExternal')
const ExamAssessmentExternal = mongoose.model('examassessmetnexternal');

// Load exam activities supervision model
require('../models/Annexure-1/ExamActivitiesSupervision')
const ExamActivitiesSupervision = mongoose.model('examactivitiessupervision');

// Load exam activities college level model
require('../models/Annexure-1/ExamActivitiesCollegeLevel')
const ExamActivitiesCollegeLevel = mongoose.model('examactivitiescollege');

// Load IT maintenance model
require('../models/Annexure-1/ITMaintenance')
const ITMaintenance = mongoose.model('itmaintenance');

// Load Lakshya model
require('../models/Annexure-1/Lakshya')
const Lakshya = mongoose.model('lakshya');

// Load magazine/newsletter model
require('../models/Annexure-1/MagazineNewsletter')
const MagazineNewsletter = mongoose.model('magazine-newsletter');

// Load STTP model
require('../models/Annexure-1/STTP')
const STTP = mongoose.model('sttp');

// Load Department UG projects model
require('../models/Annexure-1/DepartmentUGProjects')
const DepartmentUGProjects = mongoose.model('department-ug-projects');

// Time table load route
router.get('/timeTable', ensureAuthenticated, (req, res) => {
    TimeTable.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/timeTable', { result });
        })
});

// Class advisor load route
router.get('/classAdvisor', ensureAuthenticated, (req, res) => {
    ClassAdvisor.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/classAdvisor', { result });
        })
});

// Sports activity load route
router.get('/sportsActivities', ensureAuthenticated, (req, res) => {
    SportsActivities.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/sportsActivities', { result });
        })
});

// Cultural activity load route
router.get('/culturalActivities', ensureAuthenticated, (req, res) => {
    CulturalActivities.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/culturalActivities', { result });
        })
});

// project based learning load route
router.get('/projectBasedLearning', ensureAuthenticated, (req, res) => {
    ProjectBasedLearning.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/projectBasedLearning', { result });
        })
});

// udaan load route
router.get('/udaan', ensureAuthenticated, (req, res) => {
    Udaan.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/udaan', { result });
        })
});

// Placement activities load route
router.get('/placementActivities', ensureAuthenticated, (req, res) => {
    PlacementActivities.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/placementActivities', { result });
        })
});

// Inhouse placement load route
router.get('/inhousePlacement', ensureAuthenticated, (req, res) => {
    InhousePlacement.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/inhousePlacement', { result });
        })
});

// student organization load route
router.get('/studentorganizations', ensureAuthenticated, (req, res) => {
    StudentOrganizations.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/studentorganizations', { result });
        })
});

// Industrial visit load route
router.get('/industrialVisitActivities', ensureAuthenticated, (req, res) => {
    IndustrialVisitActivities.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/industrialVisitActivities', { result });
        })
});

// admission process activities load route
router.get('/admissionProcessActivities', ensureAuthenticated, (req, res) => {
    AdmissionProcessActivities.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/admissionProcessActivities', { result });
        })
});

// exam assesssment external load route
router.get('/examAssessmentExternal', ensureAuthenticated, (req, res) => {
    ExamAssessmentExternal.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/examAssessmentExternal', { result });
        })
});

// exam activities supervision route
router.get('/examActivitiesSupervision', ensureAuthenticated, (req, res) => {
    ExamActivitiesSupervision.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/examActivitiesSupervision', { result });
        })
});

// exam activities college level route
router.get('/examActivitiesCollegeLevel', ensureAuthenticated, (req, res) => {
    ExamActivitiesCollegeLevel.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/examActivitiesCollegeLevel', { result });
        })
});

// IT Maintenance level route
router.get('/ITmaintenance', ensureAuthenticated, (req, res) => {
    ITMaintenance.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/ITmaintenance', { result });
        })
});

// Load Lakshya route
router.get('/lakshya', ensureAuthenticated, (req, res) => {
    Lakshya.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/lakshya', { result });
        })
});

// Load magazine/newletter route
router.get('/magazineNewsletter', ensureAuthenticated, (req, res) => {
    MagazineNewsletter.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/magazineNewsletter', { result });
        })
});

// sttp load route
router.get('/conductOfSTTP', ensureAuthenticated, (req, res) => {
    STTP.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/conductOfSTTP', { result });
        })
});

// Dept. UG Project load route
router.get('/departmentUGProjects', ensureAuthenticated, (req, res) => {
    DepartmentUGProjects.find({ user: req.user.id })
        .then(result => {
            res.render('annexure-1/departmentUGProjects', { result });
        })
});

////////////////////////////////////
///////////////////////////////////
//////////////////////////////////







// Load all the edit forms

router.get('/timeTable/edit/:id', ensureAuthenticated, (req, res) => {
    TimeTable.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/timeTable');
            } else {
                res.render('annexure-1/timeTable', { editResult: result });
            }
        })
});

// Class advisor load route
router.get('/classAdvisor/edit/:id', ensureAuthenticated, (req, res) => {
    ClassAdvisor.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/classAdvisor');
            } else {
                res.render('annexure-1/classAdvisor', { editResult: result });
            }
        })
});

// Sports activity load route
router.get('/sportsActivities/edit/:id', ensureAuthenticated, (req, res) => {
    SportsActivities.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/sportsActivities');
            } else {
                res.render('annexure-1/sportsActivities', { editResult: result });
            }
        })
});

// Cultural activity load route
router.get('/culturalActivities/edit/:id', ensureAuthenticated, (req, res) => {
    CulturalActivities.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/culturalActivities');
            } else {
                res.render('annexure-1/culturalActivities', { editResult: result });
            }
        })
});

// project based learning load route
router.get('/projectBasedLearning/edit/:id', ensureAuthenticated, (req, res) => {
    ProjectBasedLearning.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/projectBasedLearning');
            } else {
                res.render('annexure-1/projectBasedLearning', { editResult: result });
            }
        })
});

// udaan load route
router.get('/udaan/edit/:id', ensureAuthenticated, (req, res) => {
    Udaan.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/udaan');
            } else {
                res.render('annexure-1/udaan', { editResult: result });
            }
        })
});

// Placement activities load route
router.get('/placementActivities/edit/:id', ensureAuthenticated, (req, res) => {
    PlacementActivities.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/placementActivities');
            } else {
                res.render('annexure-1/placementActivities', { editResult: result });
            }
        })
});

// Inhouse placement load route
router.get('/inhousePlacement/edit/:id', ensureAuthenticated, (req, res) => {
    InhousePlacement.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/inhousePlacement');
            } else {
                res.render('annexure-1/inhousePlacement', { editResult: result });
            }
        })
});

// student organization load route
router.get('/studentOrganizations/edit/:id', ensureAuthenticated, (req, res) => {
    StudentOrganizations.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/studentOrganizations');
            } else {
                res.render('annexure-1/studentorganizations', { editResult: result });
            }
        })
});

// Industrial visit load route
router.get('/industrialVisitActivities/edit/:id', ensureAuthenticated, (req, res) => {
    IndustrialVisitActivities.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/industrialVisitActivities');
            } else {
                res.render('annexure-1/industrialVisitActivities', { editResult: result });
            }
        })
});

// admission process activities load route
router.get('/admissionProcessActivities/edit/:id', ensureAuthenticated, (req, res) => {
    AdmissionProcessActivities.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/admissionProcessActivities');
            } else {
                res.render('annexure-1/admissionProcessActivities', { editResult: result });
            }
        })
});

// exam assesssment external load route
router.get('/examAssessmentExternal/edit/:id', ensureAuthenticated, (req, res) => {
    ExamAssessmentExternal.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/examAssessmentExternal');
            } else {
                res.render('annexure-1/examAssessmentExternal', { editResult: result });
            }
        })
});

// exam activities supervision route
router.get('/examActivitiesSupervision/edit/:id', ensureAuthenticated, (req, res) => {
    ExamActivitiesSupervision.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/examActivitiesSupervision');
            } else {
                res.render('annexure-1/examActivitiesSupervision', { editResult: result });
            }
        })
});

// exam activities college level route
router.get('/examActivitiesCollegeLevel/edit/:id', ensureAuthenticated, (req, res) => {
    ExamActivitiesCollegeLevel.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/examActivitiesCollegeLevel');
            } else {
                res.render('annexure-1/examActivitiesCollegeLevel', { editResult: result });
            }
        })
});

// IT Maintenance level route
router.get('/ITmaintenance/edit/:id', ensureAuthenticated, (req, res) => {
    ITMaintenance.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/ITmaintenance');
            } else {
                res.render('annexure-1/ITmaintenance', { editResult: result });
            }
        })
});

// Load Lakshya route
router.get('/lakshya/edit/:id', ensureAuthenticated, (req, res) => {
    Lakshya.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/lakshya');
            } else {
                res.render('annexure-1/lakshya', { editResult: result });
            }
        })
});

// Load magazine/newletter route
router.get('/magazineNewsletter/edit/:id', ensureAuthenticated, (req, res) => {
    MagazineNewsletter.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/magazineNewsletter');
            } else {
                res.render('annexure-1/magazineNewsletter', { editResult: result });
            }
        })
});

// sttp load route
router.get('/conductOfSTTP/edit/:id', ensureAuthenticated, (req, res) => {
    STTP.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/conductOfSTTP');
            } else {
                res.render('annexure-1/conductOfSTTP', { editResult: result });
            }
        })
});

// Dept. UG Project load route
router.get('/departmentUGProjects/edit/:id', ensureAuthenticated, (req, res) => {
    DepartmentUGProjects.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-1/departmentUGProjects');
            } else {
                res.render('annexure-1/departmentUGProjects', { editResult: result });
            }
        })
});

//////////////////////////////////////////////////////
/////////////////////////////
////////////////
///////

//process time table form
router.post('/timeTable', (req, res) => {
    // add preleave data into db
    const timeTableRecords = {
        role: req.body.role,
        department: req.body.department,
        semester: req.body.semester,
        user: req.user.id
    }
    new TimeTable(timeTableRecords)
        .save()
        .then(timetable => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/classAdvisor');
        });
});

//process class advisor form
router.post('/classAdvisor', (req, res) => {
    // add preleave data into db
    const classAdvisorRecords = {
        class_name: req.body.class_name,
        department: req.body.department,
        semester: req.body.semester,
        duties: req.body.duties,
        user: req.user.id
    }
    new ClassAdvisor(classAdvisorRecords)
        .save()
        .then(classAdvisor => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/sportsActivities');
        });
});

//process sports activities form
router.post('/sportsActivities', (req, res) => {
    // add preleave data into db
    const sportsActivitiesRecords = {
        sports_name: req.body.sports_name,
        sports_category: req.body.sports_category,
        sports_role: req.body.sports_role,
        sports_ojus_or_other: req.body.sports_ojus_or_other,
        user: req.user.id
    }
    new SportsActivities(sportsActivitiesRecords)
        .save()
        .then(sportsactivities => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/culturalActivities');
        });
});

//process cultural activities form
router.post('/culturalActivities', (req, res) => {
    // add preleave data into db
    const culturalActivitiesRecords = {
        cultural_name: req.body.cultural_name,
        cultural_category: req.body.cultural_category,
        cultural_role: req.body.cultural_role,
        cultural_ojus_or_other: req.body.cultural_ojus_or_other,
        user: req.user.id
    }
    new CulturalActivities(culturalActivitiesRecords)
        .save()
        .then(culturalactivities => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/projectBasedLearning');
        });
});

//process PBL activities form
router.post('/projectBasedLearning', (req, res) => {
    let errors = [];

    if (req.body.pbl_start_date > req.body.pbl_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    if (errors.length > 0) {
        res.render('annexure-1/projectBasedLearning', {
                errors: errors,
                pbl_subject: req.body.pbl_subject,
                pbl_role: req.body.pbl_role,
                pbl_start_date: req.body.pbl_start_date,
                pbl_end_date: req.body.pbl_end_date,
                pbl_description: req.body.pbl_description,
                        
            });
        }
    else{
    // add preleave data into db
    const projectBasedLearningRecords = {
        pbl_subject: req.body.pbl_subject,
        pbl_role: req.body.pbl_role,
        pbl_start_date: req.body.pbl_start_date,
        pbl_end_date: req.body.pbl_end_date,
        pbl_description: req.body.pbl_description,
        user: req.user.id
    }
    new ProjectBasedLearning(projectBasedLearningRecords)
        .save()
        .then(projectBasedLearning => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/udaan');
        });
    }
});

//process Udaan activities form
router.post('/udaan', (req, res) => {
    let errors = [];

    if (req.body.udaan_start_date > req.body.udaan_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    if (errors.length > 0) {
        res.render('annexure-1/udaan', {
                errors: errors,
                udaan_subject: req.body.udaan_subject,
                udaan_contribution: req.body.udaan_contribution,
                udaan_start_date: req.body.udaan_start_date,
                udaan_end_date: req.body.udaan_end_date,
        }
        )}
    else{
    // add preleave data into db
    const udaanRecords = {
        udaan_subject: req.body.udaan_subject,
        udaan_contribution: req.body.udaan_contribution,
        udaan_start_date: req.body.udaan_start_date,
        udaan_end_date: req.body.udaan_end_date,
        user: req.user.id
    }
    new Udaan(udaanRecords)
        .save()
        .then(udaan => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/placementActivities');
        });
    }
});

//process placement activities form
router.post('/placementActivities', (req, res) => {
    let errors = [];

    if (!req.body.no_of_companies || req.body.no_of_companies < 0) {
        errors.push({ text: 'Number of companies cannot be less than 0' });
    }
    else if (!req.body.no_of_placed_students || req.body.no_of_placed_students < 0) {
        errors.push({ text: 'Number of placed students cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-1//placementActivities', {
                errors: errors,
                placement_role: req.body.placement_role,
                no_of_companies: req.body.no_of_companies,
                no_of_placed_students: req.body.no_of_placed_students,
                department: req.body.department
        }
    )}
    else{
    // add preleave data into db
    const placementActivitiesRecords = {
        placement_role: req.body.placement_role,
        no_of_companies: req.body.no_of_companies,
        no_of_placed_students: req.body.no_of_placed_students,
        department: req.body.department,
        user: req.user.id
    }
    new PlacementActivities(placementActivitiesRecords)
        .save()
        .then(placementActivities => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/inhousePlacement');
        });
    }
});

//process inhouse placement form
router.post('/inhousePlacement', (req, res) => {
    let errors = [];

    if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-1/inhousePlacement', {
                errors: errors,
                trainings_and_workshops: req.body.trainings_and_workshops,
                class_name: req.body.class_name,
                department: req.body.department,
                no_of_participants: req.body.no_of_participants
        }
    )}
    else{
    // add preleave data into db
    const inhousePlacementRecords = {
        trainings_and_workshops: req.body.trainings_and_workshops,
        class_name: req.body.class_name,
        department: req.body.department,
        no_of_participants: req.body.no_of_participants,
        user: req.user.id
    }
    new InhousePlacement(inhousePlacementRecords)
        .save()
        .then(inhousePlacement => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/studentorganizations');
        });
    }
});

//process student organizations form
router.post('/studentorganizations', (req, res) => {
    let errors = [];

    if (req.body.student_event_start_date > req.body.student_event_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    else if (!req.body.student_event_duration || req.body.student_event_duration < 0) {
        errors.push({ text: 'Event Duration cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-1/studentorganizations', {
                errors: errors,
                student_organizations_trainings: req.body.student_organizations_trainings,
                class_name: req.body.class_name,
                department: req.body.department,
                no_of_participants: req.body.no_of_participants,
                student_organization_role: req.body.student_organization_role,
                student_event_duration: req.body.student_event_duration,
                student_event_start_date: req.body.student_event_start_date,
                student_event_end_date: req.body.student_event_end_date
        }
        )}
        else{
    // add preleave data into db
    const studentOrganizationRecords = {
        student_organizations_trainings: req.body.student_organizations_trainings,
        class_name: req.body.class_name,
        department: req.body.department,
        no_of_participants: req.body.no_of_participants,
        student_organization_role: req.body.student_organization_role,
        student_event_duration: req.body.student_event_duration,
        student_event_start_date: req.body.student_event_start_date,
        student_event_end_date: req.body.student_event_end_date,
        user: req.user.id
    }
    new StudentOrganizations(studentOrganizationRecords)
        .save()
        .then(studentOrganization => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/industrialVisitActivities');
        });
        }
});

//process Industrial visit activities form
router.post('/industrialVisitActivities', (req, res) => {
    let errors = [];

    if (req.body.iv_start_date > req.body.iv_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.industrial_visit_days || req.body.industrial_visit_days < 0) {
        errors.push({ text: 'Number of days cannot be less than 0' });
    }
    else if (!req.body.industrial_visit_hrs || req.body.industrial_visit_hrs < 0) {
        errors.push({ text: 'Number of hours cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-1/industrialVisitActivities', {
                errors: errors,
                industrial_visit_role: req.body.industrial_visit_role,
                class_name: req.body.class_name,
                department: req.body.department,
                industrial_visit_days: req.body.industrial_visit_days,
                industrial_visit_organizer: req.body.industrial_visit_organizer,
                name_of_company: req.body.name_of_company,
                iv_description: req.body.iv_description,
                industrial_visit_hrs: req.body.industrial_visit_hrs,
                iv_start_date: req.body.iv_start_date,
                iv_end_date: req.body.iv_end_date
        }
        )}
        else{
    // add preleave data into db
    const industrialVisitRecords = {
        industrial_visit_role: req.body.industrial_visit_role,
        class_name: req.body.class_name,
        department: req.body.department,
        industrial_visit_days: req.body.industrial_visit_days,
        industrial_visit_organizer: req.body.industrial_visit_organizer,
        name_of_company: req.body.name_of_company,
        iv_description: req.body.iv_description,
        industrial_visit_hrs: req.body.industrial_visit_hrs,
        iv_start_date: req.body.iv_start_date,
        iv_end_date: req.body.iv_end_date,
        user: req.user.id
    }
    new IndustrialVisitActivities(industrialVisitRecords)
        .save()
        .then(industrialVisit => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/admissionProcessActivities');
        });
    }
});

//process admission process activities form
router.post('/admissionProcessActivities', (req, res) => {
    let errors = [];

    if (req.body.admission_start_date > req.body.admission_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    if (errors.length > 0) {
        res.render('annexure-1/admissionProcessActivities', {
                errors: errors,
                admission_role: req.body.admission_role,
                admission_duties: req.body.admission_duties,
                admission_class: req.body.admission_class,
                admission_start_date: req.body.admission_start_date,
                admission_end_date: req.body.admission_end_date,
        }
    )}
    else{
    // add preleave data into db
    const admissionProcessRecords = {
        admission_role: req.body.admission_role,
        admission_duties: req.body.admission_duties,
        admission_class: req.body.admission_class,
        admission_start_date: req.body.admission_start_date,
        admission_end_date: req.body.admission_end_date,
        user: req.user.id
    }

    new AdmissionProcessActivities(admissionProcessRecords)
        .save()
        .then(industrialVisit => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/examAssessmentExternal');
        });
    }

});

//process exam assessment external form
router.post('/examAssessmentExternal', (req, res) => {
    let errors = [];

    if (!req.body.papers_revaluated || req.body.papers_revaluated < 0) {
        errors.push({ text: 'Number of papers evaluated cannot be less than 0' });
    }
    if (!req.body.papers_moderated || req.body.papers_moderated < 0) {
        errors.push({ text: 'Number of papers moderated cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-1/examAssessmentExternal', {
                errors: errors,
                exam_role_external: req.body.exam_role_external,
                semester: req.body.semester,
                name_of_college_university: req.body.name_of_college_university,
                exam_subject_external: req.body.exam_subject_external,
                outdoor_activities: req.body.outdoor_activities,
                papers_revaluated: req.body.papers_revaluated,
                papers_moderated: req.body.papers_moderated
        }
    )}
    else{
    // add preleave data into db
    const examAssessmentRecords = {
        exam_role_external: req.body.exam_role_external,
        semester: req.body.semester,
        name_of_college_university: req.body.name_of_college_university,
        exam_subject_external: req.body.exam_subject_external,
        outdoor_activities: req.body.outdoor_activities,
        papers_revaluated: req.body.papers_revaluated,
        papers_moderated: req.body.papers_moderated,
        user: req.user.id
    }
    new ExamAssessmentExternal(examAssessmentRecords)
        .save()
        .then(examAssessment => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/examActivitiesSupervision');
        });
    }
});

//process exam assessment external form
router.post('/examActivitiesSupervision', (req, res) => {
    let errors = [];

    if (!req.body.morning_sessions || req.body.morning_sessions < 0) {
        errors.push({ text: 'Number of morning sessions cannot be less than 0' });
    }
    else if (!req.body.evening_sessions || req.body.evening_sessions < 0) {
        errors.push({ text: 'Number of evening sessions cannot be less than 0'});
    }
    else if (!req.body.no_of_supervision_days || req.body.no_of_supervision_days < 0) {
        errors.push({ text: 'Number of supervision days cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-1/examActivitiesSupervision', {
                errors: errors,
                exam_role: req.body.exam_role,
                exam_name: req.body.exam_name,
                morning_sessions: req.body.morning_sessions,
                evening_sessions: req.body.evening_sessions,
                no_of_supervision_days: req.body.no_of_supervision_days
        }
    )}
    else{
    // add preleave data into db
    const examActivitiesSupervisionRecords = {
        exam_role: req.body.exam_role,
        exam_name: req.body.exam_name,
        morning_sessions: req.body.morning_sessions,
        evening_sessions: req.body.evening_sessions,
        no_of_supervision_days: req.body.no_of_supervision_days,
        user: req.user.id
    }
    new ExamActivitiesSupervision(examActivitiesSupervisionRecords)
        .save()
        .then(examActivitiesSupervision => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/examActivitiesCollegeLevel');
        });
    }
});

//process exam activities college level form
router.post('/examActivitiesCollegeLevel', (req, res) => {
    // add preleave data into db
    const examActivitiesCollegeLevel = {
        subject_name: req.body.subject_name,
        semester: req.body.semester,
        exam_type: req.body.exam_type,
        user: req.user.id
    }
    new ExamActivitiesCollegeLevel(examActivitiesCollegeLevel)
        .save()
        .then(examActivitiesCollege => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/ITmaintenance');
        });
});

//process inhouse placement form
router.post('/ITmaintenance', (req, res) => {
    // add preleave data into db
    const ITmaintenance = {
        class_name: req.body.class_name,
        IT_maintenance_desc: req.body.IT_maintenance_desc,
        IT_maintenance_task: req.body.IT_maintenance_task,
        it_maintenance_date: req.body.it_maintenance_date,
        user: req.user.id
    }
    new ITMaintenance(ITmaintenance)
        .save()
        .then(ITmaintenance => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/lakshya');
        });
});

//process lakshya form
router.post('/lakshya', (req, res) => {
    let errors = [];

    if (!req.body.lakshya_no_of_participants || req.body.lakshya_no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-1/lakshya', {
                errors: errors,
                lakshya_activities: req.body.lakshya_activities,
                lakshya_description: req.body.lakshya_description,
                lakshya_date: req.body.lakshya_date,
                lakshya_no_of_participants: req.body.lakshya_no_of_participants
        }
    )}
    else{
    // add preleave data into db
    const lakshyaRecords = {
        lakshya_activities: req.body.lakshya_activities,
        lakshya_description: req.body.lakshya_description,
        lakshya_date: req.body.lakshya_date,
        lakshya_no_of_participants: req.body.lakshya_no_of_participants,
        user: req.user.id
    }
    new Lakshya(lakshyaRecords)
        .save()
        .then(lakshyaData => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/magazineNewsletter');
        });
    }
});

//process magazine/newsletter form
router.post('/magazineNewsletter', (req, res) => {
    // add preleave data into db
    const magazineNewsletterRecords = {
        class_name: req.body.class_name,
        magazine_role: req.body.magazine_role,
        magazineNewsletter_type: req.body.magazineNewsletter_type,
        year_of_publication: req.body.year_of_publication,
        user: req.user.id
    }
    new MagazineNewsletter(magazineNewsletterRecords)
        .save()
        .then(magazineNewsletter => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/conductOfSTTP');
        });
});

//process student organizations form
router.post('/conductOfSTTP', (req, res) => {
    let errors = [];

    if (req.body.sttp_start_date > req.body.sttp_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.no_of_sttp || req.body.no_of_sttp < 0) {
        errors.push({ text: 'Number of STTP cannot be less than 0' });
    }
    else if (!req.body.sttp_duration || req.body.sttp_duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    else if (!req.body.sttp_participants || req.body.sttp_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-1/conductOfSTTP', {
                errors: errors,
                sttp_role: req.body.sttp_role,
                no_of_sttp: req.body.no_of_sttp,
                sttp_technology: req.body.sttp_technology,
                sttp_duration: req.body.sttp_duration,
                sttp_start_date: req.body.sttp_start_date,
                sttp_end_date: req.body.sttp_end_date,
                sttp_participants: req.body.sttp_participants,
                department: req.body.department
        }
        )}
    else{
    // add preleave data into db
    const conductOfSTTPRecords = {
        sttp_role: req.body.sttp_role,
        no_of_sttp: req.body.no_of_sttp,
        sttp_technology: req.body.sttp_technology,
        sttp_duration: req.body.sttp_duration,
        sttp_start_date: req.body.sttp_start_date,
        sttp_end_date: req.body.sttp_end_date,
        sttp_participants: req.body.sttp_participants,
        department: req.body.department,
        user: req.user.id
    }
    new STTP(conductOfSTTPRecords)
        .save()
        .then(sttp => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-1/departmentUGProjects');
        });
    }
});

//process class advisor form
router.post('/departmentUGProjects', (req, res) => {
    let errors = [];

    if (!req.body.project_no_of_students || req.body.project_no_of_students < 0) {
        errors.push({ text: 'Number of students cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-1/departmentUGProjects', {
                errors: errors,
                dept_project_role: req.body.dept_project_role,
                project_title: req.body.project_title,
                project_no_of_students: req.body.project_no_of_students
        }
    )}
    else{
    // add preleave data into db
    const departmentUGProjectRecords = {
        dept_project_role: req.body.dept_project_role,
        project_title: req.body.project_title,
        project_no_of_students: req.body.project_no_of_students,
        user: req.user.id
    }
    new DepartmentUGProjects(departmentUGProjectRecords)
        .save()
        .then(departmentUGProject => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-2/papersPublishedinNationalConf');
        });
    }
});

// Edit request (PUT request)



router.put('/timeTable/:id', (req, res) => {
    TimeTable.findOne({ _id: req.params.id })
    .then(result => {
        result.role = req.body.role,
        result.department = req.body.department,
        result.semester = req.body.semester

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/timeTable',);
        })
    })
});

router.put('/classAdvisor/:id', (req, res) => {
    ClassAdvisor.findOne({ _id: req.params.id })
    .then((result) => {
        result.class_name = req.body.class_name,
        result.department = req.body.department,
        result.semester = req.body.semester,
        result.duties = req.body.duties

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/classAdvisor');
        })
    })
});

router.put('/sportsActivities/:id', (req, res) => {
    SportsActivities.findOne({ _id: req.params.id })
    .then(result => {
        result.sports_name = req.body.sports_name,
        result.sports_category = req.body.sports_category,
        result.sports_role = req.body.sports_role,
        result.sports_ojus_or_other = req.body.sports_ojus_or_other

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/sportsActivities');
        })
    })
});

router.put('/culturalActivities/:id', (req, res) => {
    CulturalActivities.findOne({ _id: req.params.id })
    .then(result => {
        result.cultural_name = req.body.cultural_name,
        result.cultural_category = req.body.cultural_category,
        result.cultural_role = req.body.cultural_role,
        result.cultural_ojus_or_other = req.body.cultural_ojus_or_other

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/culturalActivities');
        })
    })
});

router.put('/projectBasedLearning/:id', (req, res) => {
    let errors = [];
    if (req.body.pbl_start_date > req.body.pbl_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    if (errors.length > 0) {
        if (req.body.pbl_start_date > req.body.pbl_end_date) {
            req.flash( 'error_msg', 'End Date should not be before start date' );
            res.redirect('/annexure-1/projectBasedLearning');
        }
    }
    else{
    ProjectBasedLearning.findOne({ _id: req.params.id })
    .then(result => {
        result.pbl_subject = req.body.pbl_subject,
        result.pbl_role = req.body.pbl_role,
        result.pbl_start_date = req.body.pbl_start_date,
        result.pbl_end_date = req.body.pbl_end_date,
        result.pbl_description = req.body.pbl_description

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/projectBasedLearning');
        })
    })
}
});

router.put('/udaan/:id', (req, res) => {
    let errors = [];
    if (req.body.udaan_start_date > req.body.udaan_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    if (errors.length > 0) {
        if (req.body.udaan_start_date > req.body.udaan_end_date) {
            req.flash( 'error_msg', 'End Date should not be before start date' );
            res.redirect('/annexure-1/udaan');
        }
    }
    else{
    Udaan.findOne({ _id: req.params.id })
    .then(result => {
        result.udaan_subject = req.body.udaan_subject,
        result.udaan_contribution = req.body.udaan_contribution,
        result.udaan_start_date = req.body.udaan_start_date,
        result.udaan_end_date = req.body.udaan_end_date

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/udaan');
        })
    })
}
});

router.put('/placementActivities/:id', (req, res) => {
    let errors = [];
    if (!req.body.no_of_companies || req.body.no_of_companies < 0) {
        errors.push({ text: 'Number of companies cannot be less than 0' });
    }
    else if (!req.body.no_of_placed_students || req.body.no_of_placed_students < 0) {
        errors.push({ text: 'Number of placed students cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (!req.body.no_of_companies || req.body.no_of_companies < 0) {
            req.flash( 'error_msg', 'Number of companies cannot be less than 0' );
            res.redirect('/annexure-1/placementActivities');
        }
        else if (!req.body.no_of_placed_students || req.body.no_of_placed_students < 0) {
            req.flash( 'error_msg', 'Number of placed students cannot be less than 0' );
            res.redirect('/annexure-1/placementActivities');
        }

    }
    else{
    PlacementActivities.findOne({ _id: req.params.id })
    .then(result => {
        result.placement_role = req.body.placement_role,
        result.no_of_companies = req.body.no_of_companies,
        result.no_of_placed_students = req.body.no_of_placed_students,
        result.department = req.body.department

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/placementActivities');
        })
    })
    }
});

router.put('/inhousePlacement/:id', (req, res) => {
    let errors = [];
    if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
            req.flash( 'error_msg', 'Number of participants cannot be less than 0' );
            res.redirect('/annexure-1/inhousePlacement');
        }
    }
    else{
    InhousePlacement.findOne({ _id: req.params.id })
    .then(result => {
        result.trainings_and_workshops = req.body.trainings_and_workshops,
        result.class_name = req.body.class_name,
        result.department = req.body.department,
        result.no_of_participants = req.body.no_of_participants

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/inhousePlacement');
        })
    })
    }
});

router.put('/studentorganizations/:id', (req, res) => {
    let errors = [];
    if (req.body.student_event_start_date > req.body.student_event_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    else if (!req.body.student_event_duration || req.body.student_event_duration < 0) {
        errors.push({ text: 'Event Duration cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (req.body.student_event_start_date > req.body.student_event_end_date) {
            req.flash( 'error_msg', 'End Date should not be before start date' );
            res.redirect('/annexure-1/studentorganizations');
        }
        else if (!req.body.no_of_participants || req.body.no_of_participants < 0) {
            req.flash( 'error_msg', 'Number of participants cannot be less than 0' );
            res.redirect('/annexure-1/studentorganizations');
        }
        else if (!req.body.student_event_duration || req.body.student_event_duration < 0) {
            req.flash( 'error_msg','Event Duration cannot be less than 0' );
            res.redirect('/annexure-1/studentorganizations');
        }
    }
    else{
    StudentOrganizations.findOne({ _id: req.params.id })
    .then(result => {
        result.student_organizations_trainings = req.body.student_organizations_trainings,
        result.class_name = req.body.class_name,
        result.department = req.body.department,
        result.no_of_participants = req.body.no_of_participants,
        result.student_organization_role = req.body.student_organization_role,
        result.student_event_duration = req.body.student_event_duration,
        result.student_event_start_date = req.body.student_event_start_date,
        result.student_event_end_date = req.body.student_event_end_date

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/studentorganizations');
        })
    })
}
});

router.put('/industrialVisitActivities/:id', (req, res) => {
    let errors = [];
    if (req.body.iv_start_date > req.body.iv_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.industrial_visit_days || req.body.industrial_visit_days < 0) {
        errors.push({ text: 'Number of days cannot be less than 0' });
    }
    else if (!req.body.industrial_visit_hrs || req.body.industrial_visit_hrs < 0) {
        errors.push({ text: 'Number of hours cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (req.body.iv_start_date > req.body.iv_end_date) {
            req.flash( 'error_msg', 'End Date should not be before start date' );
            res.redirect('/annexure-1/industrialVisitActivities');
        }
        else if (!req.body.industrial_visit_days || req.body.industrial_visit_days < 0) {
            req.flash( 'error_msg', 'Number of days cannot be less than 0' );
            res.redirect('/annexure-1/industrialVisitActivities');
        }
        else if (!req.body.industrial_visit_hrs || req.body.industrial_visit_hrs < 0) {
            req.flash( 'error_msg', 'Number of hours cannot be less than 0' );
            res.redirect('/annexure-1/industrialVisitActivities');
        }
    }
    IndustrialVisitActivities.findOne({ _id: req.params.id })
    .then(result => {
        result.industrial_visit_role = req.body.industrial_visit_role,
        result.class_name = req.body.class_name,
        result.department = req.body.department,
        result.industrial_visit_days = req.body.industrial_visit_days,
        result.industrial_visit_organizer = req.body.industrial_visit_organizer,
        result.name_of_company = req.body.name_of_company,
        result.iv_description = req.body.iv_description,
        result.industrial_visit_hrs = req.body.industrial_visit_hrs,
        result.iv_start_date = req.body.iv_start_date,
        result.iv_end_date = req.body.iv_end_date

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/industrialVisitActivities');
        })
    })
});

router.put('/admissionProcessActivities/:id', (req, res) => {
    let errors = [];
    if (req.body.admission_start_date > req.body.admission_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    if (errors.length > 0) {
        if (req.body.admission_start_date > req.body.admission_end_date) {
            req.flash( 'error_msg', 'End Date should not be before start date' );
            res.redirect('/annexure-1/admissionProcessActivities');
        }
    }
    else{
    AdmissionProcessActivities.findOne({ _id: req.params.id })
    .then(result => {
        result.admission_role = req.body.admission_role,
        result.admission_duties = req.body.admission_duties,
        result.admission_class = req.body.admission_class,
        result.admission_start_date = req.body.admission_start_date,
        result.admission_end_date = req.body.admission_end_date

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/admissionProcessActivities');
        })
    })
}
});

router.put('/examAssessmentExternal/:id', (req, res) => {
    let errors = [];
    if (!req.body.papers_revaluated || req.body.papers_revaluated < 0) {
        errors.push({ text: 'Number of papers evaluated cannot be less than 0' });
    }
    if (!req.body.papers_moderated || req.body.papers_moderated < 0) {
        errors.push({ text: 'Number of papers moderated cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (!req.body.papers_revaluated || req.body.papers_revaluated < 0) {
            req.flash( 'error_msg', 'Number of papers evaluated cannot be less than 0' );
            res.redirect('/annexure-1/examAssessmentExternal');
        }
        if (!req.body.papers_moderated || req.body.papers_moderated < 0) {
            req.flash( 'error_msg', 'Number of papers moderated cannot be less than 0' );
            res.redirect('/annexure-1/examAssessmentExternal');
        }
    }
    else{
    ExamAssessmentExternal.findOne({ _id: req.params.id })
    .then(result => {
        result.exam_role_external = req.body.exam_role_external,
        result.semester = req.body.semester,
        result.name_of_college_university = req.body.name_of_college_university,
        result.exam_subject_external = req.body.exam_subject_external,
        result.outdoor_activities = req.body.outdoor_activities,
        result.papers_revaluated = req.body.papers_revaluated,
        result.papers_moderated = req.body.papers_moderated

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/examAssessmentExternal');
        })
    })
    }
});

router.put('/examActivitiesSupervision/:id', (req, res) => {
    let errors = [];
    if (!req.body.morning_sessions || req.body.morning_sessions < 0) {
        errors.push({ text: 'Number of morning sessions cannot be less than 0' });
    }
    else if (!req.body.evening_sessions || req.body.evening_sessions < 0) {
        errors.push({ text: 'Number of evening sessions cannot be less than 0'});
        

    }
    else if (!req.body.no_of_supervision_days || req.body.no_of_supervision_days < 0) {
        errors.push({ text: 'Number of supervision days cannot be less than 0' });

    }
    if (errors.length > 0) {
        if (!req.body.morning_sessions || req.body.morning_sessions < 0) {
            req.flash( 'error_msg', 'Number of morning sessions cannot be less than 0' );
            res.redirect('/annexure-1/examActivitiesSupervision');

        }
        else if (!req.body.evening_sessions || req.body.evening_sessions < 0) {
            req.flash( 'error_msg','Number of evening sessions cannot be less than 0');
            res.redirect('/annexure-1/examActivitiesSupervision');

        }
        else if (!req.body.no_of_supervision_days || req.body.no_of_supervision_days < 0) {
            req.flash( 'error_msg', 'Number of supervision days cannot be less than 0' );
            res.redirect('/annexure-1/examActivitiesSupervision');

        }
        
    }
    else{
    ExamActivitiesSupervision.findOne({ _id: req.params.id })
    .then(result => {
        result.exam_role = req.body.exam_role,
        result.exam_name = req.body.exam_name,
        result.morning_sessions = req.body.morning_sessions,
        result.evening_sessions = req.body.evening_sessions,
        result.no_of_supervision_days = req.body.no_of_supervision_days
        
        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/examActivitiesSupervision');
        })
    })
    }
});

router.put('/examActivitiesCollegeLevel/:id', (req, res) => {
    ExamActivitiesCollegeLevel.findOne({ _id: req.params.id })
    .then(result => {
        result.subject_name = req.body.subject_name,
        result.semester = req.body.semester,
        result.exam_type = req.body.exam_type
        
        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/examActivitiesCollegeLevel');
        })
    })
});

router.put('/ITmaintenance/:id', (req, res) => {
    ITMaintenance.findOne({ _id: req.params.id })
    .then(result => {
        result.class_name = req.body.class_name,
        result.IT_maintenance_desc = req.body.IT_maintenance_desc,
        result.IT_maintenance_task = req.body.IT_maintenance_task,
        result.it_maintenance_date = req.body.it_maintenance_date
        
        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/ITmaintenance');
        })
    })
});

router.put('/lakshya/:id', (req, res) => {
    let errors = [];
    if (!req.body.lakshya_no_of_participants || req.body.lakshya_no_of_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (!req.body.lakshya_no_of_participants || req.body.lakshya_no_of_participants < 0) {
            req.flash( 'error_msg', 'Number of participants cannot be less than 0' );
            res.redirect('/annexure-1/lakshya');
        }
    }
    else{
    Lakshya.findOne({ _id: req.params.id })
    .then(result => {
        result.lakshya_activities = req.body.lakshya_activities,
        result.lakshya_description = req.body.lakshya_description,
        result.lakshya_date = req.body.lakshya_date,
        result.lakshya_no_of_participants = req.body.lakshya_no_of_participants
        
        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/Lakshya');
        })
    })
    }
});

router.put('/magazineNewsletter/:id', (req, res) => {
    MagazineNewsletter.findOne({ _id: req.params.id })
    .then(result => {
        result.class_name = req.body.class_name,
        result.magazine_role = req.body.magazine_role,
        result.magazineNewsletter_type = req.body.magazineNewsletter_type,
        result.year_of_publication = req.body.year_of_publication
        
        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/magazineNewsletter');
        })
    })
});

router.put('//:id', (req, res) => {
    let errors = [];
    if (req.body.sttp_start_date > req.body.sttp_end_date) {
        errors.push({ text: 'End Date should not be before start date' });
    }
    else if (!req.body.no_of_sttp || req.body.no_of_sttp < 0) {
        errors.push({ text: 'Number of STTP cannot be less than 0' });
    }
    else if (!req.body.sttp_duration || req.body.sttp_duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    else if (!req.body.sttp_participants || req.body.sttp_participants < 0) {
        errors.push({ text: 'Number of participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (req.body.udaan_start_date > req.body.udaan_end_date) {
            req.flash( 'error_msg', 'End Date should not be before start date' );
            res.redirect('/annexure-1/conductOfSTTP');
        }
        if (req.body.sttp_start_date > req.body.sttp_end_date) {
            req.flash( 'error_msg', 'End Date should not be before start date' );
            res.redirect('/annexure-1/conductOfSTTP');
        }
        else if (!req.body.no_of_sttp || req.body.no_of_sttp < 0) {
            req.flash( 'error_msg', 'Number of STTP cannot be less than 0' );
            res.redirect('/annexure-1/conductOfSTTP');
        }
        else if (!req.body.sttp_duration || req.body.sttp_duration < 0) {
            req.flash( 'error_msg', 'Duration cannot be less than 0' );
            res.redirect('/annexure-1/conductOfSTTP');
        }
        else if (!req.body.sttp_participants || req.body.sttp_participants < 0) {
            req.flash( 'error_msg', 'Number of participants cannot be less than 0' );
        }
    }
    else{
    STTP.findOne({ _id: req.params.id })
    .then(result => {
        result.sttp_role = req.body.sttp_role,
        result.no_of_sttp = req.body.no_of_sttp,
        result.sttp_technology = req.body.sttp_technology,
        result.sttp_duration = req.body.sttp_duration,
        result.sttp_start_date = req.body.sttp_start_date,
        result.sttp_end_date = req.body.sttp_end_date,
        result.sttp_participants = req.body.sttp_participants,
        result.department = req.body.department
        
        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/conductOfSTTP');
        })
    })
}
});

router.put('/departmentUGProjects/:id', (req, res) => {
    let errors = [];
    if (!req.body.project_no_of_students || req.body.project_no_of_students < 0) {
        errors.push({ text: 'Number of students cannot be less than 0' });
    }
    if (errors.length > 0) {
        if (!req.body.project_no_of_students || req.body.project_no_of_students < 0) {
            req.flash( 'error_msg', 'Number of students cannot be less than 0' );
            res.redirect('/annexure-1/departmentUGProjects');
        }
    }
    else{
    DepartmentUGProjects.findOne({ _id: req.params.id })
    .then(result => {
        result.dept_project_role = req.body.dept_project_role,
        result.project_title = req.body.project_title,
        result.project_no_of_students = req.body.project_no_of_students
        
        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-1/departmentUGProjects');
        })
    })
    }
});

// Delete data of annexure-1 forms
router.delete('/timeTable/delete/:id', (req, res) => {
    TimeTable.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/timeTable');
    })
});

router.delete('/classAdvisor/delete/:id', (req, res) => {
    ClassAdvisor.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/classAdvisor');
    })
});

router.delete('/sportsActivities/delete/:id', (req, res) => {
    SportsActivities.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/sportsActivities');
    })
});

router.delete('/culturalActivities/delete/:id', (req, res) => {
    CulturalActivities.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/culturalActivities');
    })
});

router.delete('/projectBasedLearning/delete/:id', (req, res) => {
    ProjectBasedLearning.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/projectBasedLearning');
    })
});

router.delete('/udaan/delete/:id', (req, res) => {
    Udaan.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/udaan');
    })
});

router.delete('/placementActivities/delete/:id', (req, res) => {
    PlacementActivities.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/placementActivities');
    })
});

router.delete('/inhousePlacement/delete/:id', (req, res) => {
    InhousePlacement.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/inhousePlacement');
    })
});

router.delete('/studentorganizations/delete/:id', (req, res) => {
    StudentOrganizations.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/studentorganizations');
    })
});

router.delete('/industrialVisitActivities/delete/:id', (req, res) => {
    IndustrialVisitActivities.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/industrialVisitActivities');
    })
});

router.delete('/admissionProcessActivities/delete/:id', (req, res) => {
    AdmissionProcessActivities.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/admissionProcessActivities');
    })
});

router.delete('/examAssessmentExternal/delete/:id', (req, res) => {
    ExamAssessmentExternal.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/examAssessmentExternal');
    })
});

router.delete('/examActivitiesSupervision/delete/:id', (req, res) => {
    ExamActivitiesSupervision.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/examActivitiesSupervision');
    })
});

router.delete('/examActivitiesCollegeLevel/delete/:id', (req, res) => {
    ExamActivitiesCollegeLevel.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/examActivitiesCollegeLevel');
    })
});

router.delete('/ITmaintenance/delete/:id', (req, res) => {
    ITMaintenance.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/ITmaintenance');
    })
});

router.delete('/lakshya/delete/:id', (req, res) => {
    Lakshya.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/lakshya');
    })
});

router.delete('/magazineNewsletter/delete/:id', (req, res) => {
    MagazineNewsletter.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/magazineNewsletter');
    })
});

router.delete('/conductOfSTTP/delete/:id', (req, res) => {
    STTP.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/conductOfSTTP');
    })
});

router.delete('/departmentUGProjects/delete/:id', (req, res) => {
    DepartmentUGProjects.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successfully');
        res.redirect('/annexure-1/departmentUGProjects');
    })
});

module.exports = router;