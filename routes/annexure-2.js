const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load paper published in national conference model
require('../models/Annexure-2/PapersPublishedNationalConf');
const PapersPublishedNationalConf = mongoose.model('paper-published-national-conf');

// Load paper published in international conference model
require('../models/Annexure-2/PapersPublishedInternationalConf');
const PapersPublishedInternationalConf = mongoose.model('paper-published-international-conf');

// Load paper published in journals model
require('../models/Annexure-2/PapersPublishedJournals');
const PapersPublishedJournals = mongoose.model('paper-published-journals');

// Load moocs model
require('../models/Annexure-2/Moocs');
const Moocs = mongoose.model('moocs');

// Load swayam model
require('../models/Annexure-2/Swayam');
const Swayam = mongoose.model('swayam');

// Load short term training model
require('../models/Annexure-2/ShortTermTraining');
const ShortTermTraining = mongoose.model('Short-term-training');

// Load seminars model
require('../models/Annexure-2/Seminars');
const Seminars = mongoose.model('seminars');

// paper publication in national conf load route
router.get('/papersPublishedinNationalConf', (req, res) => {
    res.render('annexure-2/papersPublishedinNationalConf');
});

// paper publication in international conf load route
router.get('/papersPublishedinInternationalConf', (req, res) => {
    res.render('annexure-2/papersPublishedinInternationalConf');
});

// Papers Published in Journals load route
router.get('/papersPublishedinJournals', (req, res) => {
    res.render('annexure-2/papersPublishedinJournals');
});

// MOOCS load route
router.get('/moocs', (req, res) => {
    res.render('annexure-2/moocs');
});

// Swayam conf load route
router.get('/swayam', (req, res) => {
    res.render('annexure-2/swayam');
});

// Short Term Training conf load route
router.get('/shortTermTraining', (req, res) => {
    res.render('annexure-2/shortTermTraining');
});

// Seminars conf load route
router.get('/seminars', (req, res) => {
    res.render('annexure-2/seminars');
});

//process paper published in national conference form
router.post('/papersPublishedinNationalConf', (req, res) => {
    // add preleave data into db
    const papersPublishedNationalRecords = {
        title_of_paper_published: req.body.title_of_paper_published,
        published_date: req.body.published_date,
        name_of_conference: req.body.name_of_conference,
        isbn_issn_number: req.body.isbn_issn_number,
        name_of_coauthor: req.body.name_of_coauthor,
        impact_factor: req.body.impact_factor,
        no_of_citations: req.body.no_of_citations,
        rating: req.body.rating,
        link: req.body.link
    }
    new PapersPublishedNationalConf(papersPublishedNationalRecords)
        .save()
        .then(papersPublishedNational => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-2/papersPublishedinInternationalConf');
        });
});

//process paper published in international conference form
router.post('/papersPublishedinInternationalConf', (req, res) => {
    // add preleave data into db
    const papersPublishedInternationalRecords = {
        title_of_paper_published: req.body.title_of_paper_published,
        published_date: req.body.published_date,
        name_of_conference: req.body.name_of_conference,
        isbn_issn_number: req.body.isbn_issn_number,
        name_of_coauthor: req.body.name_of_coauthor,
        impact_factor: req.body.impact_factor,
        no_of_citations: req.body.no_of_citations,
        rating: req.body.rating,
        link: req.body.link
    }
    new PapersPublishedInternationalConf(papersPublishedInternationalRecords)
        .save()
        .then(papersPublishedInternational => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-2/papersPublishedinJournals');
        });
});

//process paper published in journals form
router.post('/papersPublishedinJournals', (req, res) => {
    // add preleave data into db
    const papersPublishedJournalsRecords = {
        title_of_paper_published: req.body.title_of_paper_published,
        published_date: req.body.published_date,
        name_of_conference: req.body.name_of_conference,
        isbn_issn_number: req.body.isbn_issn_number,
        name_of_coauthor: req.body.name_of_coauthor,
        impact_factor: req.body.impact_factor,
        no_of_citations: req.body.no_of_citations,
        rating: req.body.rating,
        link: req.body.link
    }
    new PapersPublishedJournals(papersPublishedJournalsRecords)
        .save()
        .then(papersPublishedJournals => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-2/moocs');
        });
});

//process moocs form
router.post('/moocs', (req, res) => {
    // add preleave data into db
    const moocsRecords = {
        name_of_moocs_undertaken: req.body.name_of_moocs_undertaken,
        moocs_date: req.body.moocs_date,
        moocs_duartion: req.body.moocs_duartion,
        certification_status: req.body.certification_status
    }
    new Moocs(moocsRecords)
        .save()
        .then(moocs => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-2/swayam');
        });
});

//process swayam form
router.post('/swayam', (req, res) => {
    // add preleave data into db
    const swayamRecords = {
        name_of_swayam_undertaken: req.body.name_of_swayam_undertaken,
        swayam_date: req.body.swayam_date,
        swayam_duartion: req.body.swayam_duartion,
        certification_status: req.body.certification_status
    }
    new Swayam(swayamRecords)
        .save()
        .then(swayam => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-2/shortTermTraining');
        });
});

//process short term training form
router.post('/shortTermTraining', (req, res) => {
    // add preleave data into db
    const shortTermTrainingRecords = {
        short_term_training: req.body.short_term_training,
        techonology: req.body.techonology,
        duration_of_course: req.body.duration_of_course,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        internal_external: req.body.internal_external
    }
    new ShortTermTraining(shortTermTrainingRecords)
        .save()
        .then(shortTermTraining => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-2/seminars');
        });
});

//process seminars form
router.post('/seminars', (req, res) => {
    // add preleave data into db
    const seminarsRecords = {
        name_of_seminar: req.body.name_of_seminar,
        techonology: req.body.techonology,
        duration_of_course: req.body.duration_of_course,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        internal_external: req.body.internal_external
    }
    new Seminars(seminarsRecords)
        .save()
        .then(seminars => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-3/resourcePerson');
        });
});

module.exports = router;