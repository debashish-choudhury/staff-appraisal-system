const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

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
router.get('/resourcePerson', (req, res) => {
    res.render('annexure-3/resourcePerson');
});

// contribute to syllabus load route
router.get('/contributionToSyllabus', (req, res) => {
    res.render('annexure-3/contributionToSyllabus');
});

// mumber of university load route
router.get('/memberOfUniversityCommitte', (req, res) => {
    res.render('annexure-3/memberOfUniversityCommitte');
});

// consultancy assignment load route
router.get('/consultancyAssignment', (req, res) => {
    res.render('annexure-3/consultancyAssignment');
});

// External project load route
router.get('/externalProjectsOrCompetition', (req, res) => {
    res.render('annexure-3/externalProjectsOrCompetition');
});

// Processing resource person form
router.post('/resourcePerson', (req, res) => {
    // add preleave data into db
    const resourcePerson = {
        topicName: req.body.topicName,
        department: req.body.department,
        nameofInstitute: req.body.nameofInstitute,
        numberofParticipants: req.body.numberofParticipants
    }
    new ResourcePerson(resourcePerson)
        .save()
        .then(resourcePersonRecords => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-3/contributionToSyllabus');
        });
});

// Processing contribution to syllabus form
router.post('/contributionToSyllabus', (req, res) => {
    // add preleave data into db
    const contributionToSyllabus = {
        nameofSub: req.body.nameofSub,
        role: req.body.role,
        nameofUniversity: req.body.nameofUniversity,
        otherDetails: req.body.otherDetails
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
        nameofCommittee: req.body.nameofCommittee,
        rolesAndResponsibility: req.body.rolesAndResponsibility,
        designation: req.body.designation
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
    // add preleave data into db
    const consultancyAssignment = {
        rolesAndResponsilbilty: req.body.rolesAndResponsilbilty,
        typeOfWorkorDomain: req.body.typeOfWorkorDomain,
        organization: req.body.organization,
        duration: req.body.duration,
        numberofVisits: req.body.numberofVisits
    }
    new ConsultancyAssignment(consultancyAssignment)
        .save()
        .then(consultancyAssignmentRecords => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-3/externalProjectsOrCompetition');
        });
});

// Processing external projects or competitions form
router.post('/externalProjectsOrCompetition', (req, res) => {
    // add preleave data into db
    const externalProjectsOrCompetition = {
        description: req.body.description,
        contribution: req.body.contribution,
        university: req.body.university,
        duration: req.body.duration,
        comments: req.body.comments
    }
    new ExternalProjectsOrCompetition(externalProjectsOrCompetition)
        .save()
        .then(externalProjectsOrCompetitionRecords => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-3/externalProjectsOrCompetition');
        });
});

module.exports = router;