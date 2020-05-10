const express = require('express');
const mongoose = require('mongoose');
const { ensureAuthenticated } = require('../helpers/auth');
const router = express.Router();
const AcademicYear = require('../config/academicYear');
let year;

// Load resource person model
require('../models/Annexure-3/ResourcePerson');
const ResourcePerson = mongoose.model('resource_person');

// Load resource person model
require('../models/Annexure-3//ContributionToSyllabus');
const ContributionToSyllabus = mongoose.model('Contribution_to_Syllabus');

// Load resource person model
require('../models/Annexure-3//MemberOfUniversityCommitte');
const MemberOfUniversityCommitte = mongoose.model('Member_of_University_Commite');

// Load resource person model
require('../models/Annexure-3//ConsultancyAssignment');
const ConsultancyAssignment = mongoose.model('consultancy_assignment');

// Load resource person model
require('../models/Annexure-3/ExternalProjectsOrCompetition');
const ExternalProjectsOrCompetition = mongoose.model('external_projects_or_competition');

// Resourse person load route
router.get('/resourcePerson', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ResourcePerson.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('annexure-3/resourcePerson', { result });
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// contribute to syllabus load route
router.get('/contributionToSyllabus', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ContributionToSyllabus.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('annexure-3/contributionToSyllabus', { result });
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// mumber of university load route
router.get('/memberOfUniversityCommitte', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            MemberOfUniversityCommitte.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('annexure-3/memberOfUniversityCommitte', { result });
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// consultancy assignment load route
router.get('/consultancyAssignment', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ConsultancyAssignment.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('annexure-3/consultancyAssignment', { result })
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// External project load route
router.get('/externalProjectsOrCompetition', ensureAuthenticated, (req, res) => {
    AcademicYear.find({ user: req.user.id })
        .then(result => {
            if (!result) {
                req.flash('error_msg', 'Select the academic year before proceeding');
                res.redirect('/');
            }
            year = result[0].academic_year;
            ExternalProjectsOrCompetition.find({ $and: [{ user: req.user.id }, { academic_year: year }] })
                .then(result => {
                    res.render('annexure-3/externalProjectsOrCompetition', { result });
                })
        })
        .catch(() => {
            req.flash('error_msg', 'Select the academic year before proceeding.');
            res.redirect('/');
        })
});

// Load edit Route for Annexure-3
// Resourse person load route
router.get('/resourcePerson/edit/:id', ensureAuthenticated, (req, res) => {
    ResourcePerson.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-3/resourcePerson');
            } else {
                res.render('annexure-3/resourcePerson', { editResult: result });
            }
        })
});

// contribute to syllabus load route
router.get('/contributionToSyllabus/edit/:id', ensureAuthenticated, (req, res) => {
    ContributionToSyllabus.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-3/contributionToSyllabus');
            } else {
                res.render('annexure-3/contributionToSyllabus', { editResult: result });
            }
        })
});

// mumber of university load route
router.get('/memberOfUniversityCommitte/edit/:id', ensureAuthenticated, (req, res) => {
    MemberOfUniversityCommitte.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-3/contributionToSyllabus');
            } else {
                res.render('annexure-3/memberOfUniversityCommitte', { editResult: result });
            }
        })
});

// consultancy assignment load route
router.get('/consultancyAssignment/edit/:id', ensureAuthenticated, (req, res) => {
    ConsultancyAssignment.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-3/consultancyAssignment');
            } else {
                res.render('annexure-3/consultancyAssignment', { editResult: result });
            }
        })
});

// External project load route
router.get('/externalProjectsOrCompetition/edit/:id', ensureAuthenticated, (req, res) => {
    ExternalProjectsOrCompetition.findOne({ _id: req.params.id })
        .then(result => {
            if (result.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/annexure-3/externalProjectsOrCompetition');
            } else {
                res.render('annexure-3/externalProjectsOrCompetition', { editResult: result });
            }
        })
});


// Processing resource person form
router.post('/resourcePerson', (req, res) => {
    let errors = [];

    if (!req.body.numberofParticipants || req.body.numberofParticipants < 0) {
        errors.push({ text: 'Participants cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-3/resourcePerson', {
            errors: errors,
            topicName: req.body.topicName,
            department: req.body.department,
            nameofInstitute: req.body.nameofInstitute,
            numberofParticipants: req.body.numberofParticipants
        }
        )
    }
    else {
        // add preleave data into db
        const resourcePerson = {
            academic_year: year,
            topicName: req.body.topicName,
            department: req.body.department,
            nameofInstitute: req.body.nameofInstitute,
            numberofParticipants: req.body.numberofParticipants,
            user: req.user.id
        }
        new ResourcePerson(resourcePerson)
            .save()
            .then(resourcePersonRecords => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/annexure-3/contributionToSyllabus');
            });
    }
});

// Processing contribution to syllabus form
router.post('/contributionToSyllabus', (req, res) => {

    // add preleave data into db
    const contributionToSyllabus = {
        academic_year: year,
        nameofSub: req.body.nameofSub,
        role: req.body.role,
        nameofUniversity: req.body.nameofUniversity,
        otherDetails: req.body.otherDetails,
        user: req.user.id
    }
    new ContributionToSyllabus(contributionToSyllabus)
        .save()
        .then(contributionToSyllabusRecords => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-3/memberOfUniversityCommitte');
        });
});

// Processing member of university committe form
router.post('/memberOfUniversityCommitte', (req, res) => {
    // add preleave data into db
    const memberOfUniversityCommitte = {
        academic_year: year,
        nameofCommittee: req.body.nameofCommittee,
        rolesAndResponsibility: req.body.rolesAndResponsibility,
        designation: req.body.designation,
        user: req.user.id
    }
    new MemberOfUniversityCommitte(memberOfUniversityCommitte)
        .save()
        .then(memberOfUniversityCommitteRecords => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-3/consultancyAssignment');
        });
});

// Processing consultancy assignment form
router.post('/consultancyAssignment', (req, res) => {
    let errors = [];

    if (!req.body.duration || req.body.duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    else if (!req.body.numberofVisits || req.body.numberofVisits < 0) {
        errors.push({ text: 'Number of visit cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-3/consultancyAssignment', {
            errors: errors,
            rolesAndResponsilbilty: req.body.rolesAndResponsilbilty,
            typeOfWorkorDomain: req.body.typeOfWorkorDomain,
            organization: req.body.organization,
            duration: req.body.duration,
            numberofVisits: req.body.numberofVisits,
        }
        )
    }
    else {
        // add preleave data into db
        const consultancyAssignment = {
            academic_year: year,
            rolesAndResponsilbilty: req.body.rolesAndResponsilbilty,
            typeOfWorkorDomain: req.body.typeOfWorkorDomain,
            organization: req.body.organization,
            duration: req.body.duration,
            numberofVisits: req.body.numberofVisits,
            user: req.user.id
        }
        new ConsultancyAssignment(consultancyAssignment)
            .save()
            .then(consultancyAssignmentRecords => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/annexure-3/externalProjectsOrCompetition');
            });
    }
});

// Processing external projects or competitions form
router.post('/externalProjectsOrCompetition', (req, res) => {
    let errors = [];

    if (!req.body.duration || req.body.duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    if (errors.length > 0) {
        res.render('annexure-3/externalProjectsOrCompetition', {
            errors: errors,
            description: req.body.description,
            contribution: req.body.contribution,
            university: req.body.university,
            duration: req.body.duration,
            comments: req.body.comments
        }
        )
    }
    else {
        // add preleave data into db
        const externalProjectsOrCompetition = {
            academic_year: year,
            description: req.body.description,
            contribution: req.body.contribution,
            university: req.body.university,
            duration: req.body.duration,
            comments: req.body.comments,
            user: req.user.id
        }
        new ExternalProjectsOrCompetition(externalProjectsOrCompetition)
            .save()
            .then(externalProjectsOrCompetitionRecords => {
                req.flash('success_msg', 'Data entered successfully');
                res.redirect('/annexure-3/externalProjectsOrCompetition');
            });
    }
});

// PUT request Route
router.put('/resourcePerson/:id', (req, res) => {
    let errors = [];
    if (!req.body.numberofParticipants || req.body.numberofParticipants < 0) {
        errors.push({ text: 'Participants cannot be less than 0' });
    }
    if (errors.length > 0) {

        if (!req.body.numberofParticipants || req.body.numberofParticipants < 0) {
            req.flash('error_msg', 'Participants cannot be less than 0');
            res.redirect('/annexure-3/resourcePerson');
        }
    }
    else {
        ResourcePerson.findOne({ _id: req.params.id })
            .then(result => {
                result.topicName = req.body.topicName,
                    result.department = req.body.department,
                    result.nameofInstitute = req.body.nameofInstitute,
                    result.numberofParticipants = req.body.numberofParticipants

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated Successfully');
                        res.redirect('/annexure-3/resourcePerson');
                    })
            })
    }
});

router.put('/contributionToSyllabus/:id', (req, res) => {
    ContributionToSyllabus.findOne({ _id: req.params.id })
        .then(result => {
            result.nameofSub = req.body.nameofSub,
                result.role = req.body.role,
                result.nameofUniversity = req.body.nameofUniversity,
                result.otherDetails = req.body.otherDetails

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated Successfully');
                    res.redirect('/annexure-3/contributionToSyllabus');
                })
        })
});

router.put('/memberOfUniversityCommitte/:id', (req, res) => {
    MemberOfUniversityCommitte.findOne({ _id: req.params.id })
        .then(result => {
            result.nameofCommittee = req.body.nameofCommittee,
                result.rolesAndResponsibility = req.body.rolesAndResponsibility,
                result.designation = req.body.designation

            result.save()
                .then(() => {
                    req.flash('success_msg', 'Data updated Successfully');
                    res.redirect('/annexure-3/memberOfUniversityCommitte');
                })
        })
});

router.put('/consultancyAssignment/:id', (req, res) => {
    let errors = [];
    if (!req.body.duration || req.body.duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    else if (!req.body.numberofVisits || req.body.numberofVisits < 0) {
        errors.push({ text: 'Number of visit cannot be less than 0' });
    }
    if (errors.length > 0) {

        if (!req.body.duration || req.body.duration < 0) {
            req.flash('error_msg', 'Duration cannot be less than 0');
            res.redirect('/annexure-3/consultancyAssignment');
        }
        else if (!req.body.numberofVisits || req.body.numberofVisits < 0) {
            req.flash('error_msg', 'Number of visit cannot be less than 0');
            res.redirect('/annexure-3/consultancyAssignment');
        }
    }
    else {
        ConsultancyAssignment.findOne({ _id: req.params.id })
            .then(result => {
                result.rolesAndResponsilbilty = req.body.rolesAndResponsilbilty,
                    result.typeOfWorkorDomain = req.body.typeOfWorkorDomain,
                    result.organization = req.body.organization,
                    result.duration = req.body.duration,
                    result.numberofVisits = req.body.numberofVisits

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated Successfully');
                        res.redirect('/annexure-3/consultancyAssignment');
                    })
            })
    }
});

router.put('/externalProjectsOrCompetition/:id', (req, res) => {
    let errors = [];
    if (!req.body.duration || req.body.duration < 0) {
        errors.push({ text: 'Duration cannot be less than 0' });
    }
    if (errors.length > 0) {

        if (!req.body.duration || req.body.duration < 0) {
            req.flash('error_msg', 'Duration cannot be less than 0');
            res.redirect('/annexure-3/externalProjectsOrCompetition');
        }
    }
    else {
        ExternalProjectsOrCompetition.findOne({ _id: req.params.id })
            .then(result => {
                result.description = req.body.description,
                    result.contribution = req.body.contribution,
                    result.university = req.body.university,
                    result.duration = req.body.duration,
                    result.comments = req.body.comments

                result.save()
                    .then(() => {
                        req.flash('success_msg', 'Data updated Successfully');
                        res.redirect('/annexure-3/externalProjectsOrCompetition');
                    })
            })
    }
});

// Delete Route
router.delete('/resourcePerson/delete/:id', (req, res) => {
    ResourcePerson.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/annexure-3/resourcePerson');
        })
});

router.delete('/contributionToSyllabus/delete/:id', (req, res) => {
    ContributionToSyllabus.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/annexure-3/contributionToSyllabus');
        })
});

router.delete('/memberOfUniversityCommitte/delete/:id', (req, res) => {
    MemberOfUniversityCommitte.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/annexure-3/memberOfUniversityCommitte');
        })
});

router.delete('/consultancyAssignment/delete/:id', (req, res) => {
    ConsultancyAssignment.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/annexure-3/consultancyAssignment');
        })
});

router.delete('/externalProjectsOrCompetition/delete/:id', (req, res) => {
    ExternalProjectsOrCompetition.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Data is deleted successfully');
            res.redirect('/annexure-3/externalProjectsOrCompetition');
        })
});

module.exports = router;