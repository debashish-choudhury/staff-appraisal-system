const express = require('express');
const mongoose = require('mongoose');
const {ensureAuthenticated} = require('../helpers/auth');
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

router.get('/papersPublishedinNationalConf', ensureAuthenticated, (req, res) => {
    PapersPublishedNationalConf.find({user: req.user.id})
    .then(result => {
        res.render('annexure-2/papersPublishedinNationalConf', { result: result });
    });
});

// paper publication in international conf load route
router.get('/papersPublishedinInternationalConf', ensureAuthenticated, (req, res) => {
    PapersPublishedInternationalConf.find({user: req.user.id})
    .then(result => {
        res.render('annexure-2/papersPublishedinInternationalConf', { result: result });
    });
});

// Papers Published in Journals load route
router.get('/papersPublishedinJournals', ensureAuthenticated, (req, res) => {
    PapersPublishedJournals.find({user: req.user.id})
    .then(result => {
        res.render('annexure-2/papersPublishedinJournals', { result: result });
    });
});

// MOOCS load route
router.get('/moocs', ensureAuthenticated, (req, res) => {
    Moocs.find({user: req.user.id})
    .then(result => {
        res.render('annexure-2/moocs', { result: result });
    });
});

// Swayam conf load route
router.get('/swayam', ensureAuthenticated, (req, res) => {
    Swayam.find({user: req.user.id})
    .then(result => {
        res.render('annexure-2/swayam', { result: result });
    });
});

// Short Term Training conf load route
router.get('/shortTermTraining', ensureAuthenticated, (req, res) => {
    ShortTermTraining.find({user: req.user.id})
    .then(result => {
        res.render('annexure-2/shortTermTraining', { result: result });
    });
});

// Seminars conf load route
router.get('/seminars', ensureAuthenticated, (req, res) => {
    Seminars.find({user: req.user.id})
    .then(result => {
        res.render('annexure-2/seminars', { result: result });
    });
});

/////////////////////
//////////////////////
////////////////////
///////////////////////////////////////
//
////////////////////////////////////
//////////

// Load edit page
// paper publication in national conf load route
router.get('/papersPublishedinNationalConf/edit/:id', ensureAuthenticated, (req, res) => {
    PapersPublishedNationalConf.findOne({_id: req.params.id})
    .then(result => {
        if(result.user != req.user.id) {
            req.flash('error_msg', 'Not Authorized');
            res.redirect('/annexure-2/papersPublishedinNationalConf');
        } else {
            res.render('annexure-2/papersPublishedinNationalConf', { editResult: result });
        }
    });
});

// paper publication in international conf load route
router.get('/papersPublishedinInternationalConf/edit/:id', ensureAuthenticated, (req, res) => {
    PapersPublishedInternationalConf.findOne({_id: req.params.id})
    .then(result => {
        if(result.user != req.user.id) {
            req.flash('error_msg', 'Not Authorized');
            res.redirect('/annexure-2/papersPublishedinInternationalConf');
        } else {
            res.render('annexure-2/papersPublishedinInternationalConf', { editResult: result });
        }
    });
});

// Papers Published in Journals load route
router.get('/papersPublishedinJournals/edit/:id', ensureAuthenticated, (req, res) => {
    PapersPublishedJournals.findOne({_id: req.params.id})
    .then(result => {
        if(result.user != req.user.id) {
            req.flash('error_msg', 'Not Authorized');
            res.redirect('/annexure-2/papersPublishedinNationalConf');
        } else {
            res.render('annexure-2/papersPublishedinJournals', { editResult: result });
        }
    });
});

// MOOCS load route
router.get('/moocs/edit/:id', ensureAuthenticated, (req, res) => {
    Moocs.findOne({_id: req.params.id})
    .then(result => {
        if(result.user != req.user.id) {
            req.flash('error_msg', 'Not Authorized');
            res.redirect('/annexure-2/moocs');
        } else {
            res.render('annexure-2/moocs', { editResult: result });
        }
    });
});

// Swayam conf load route
router.get('/swayam/edit/:id', ensureAuthenticated, (req, res) => {
    Swayam.findOne({_id: req.params.id})
    .then(result => {
        if(result.user != req.user.id) {
            req.flash('error_msg', 'Not Authorized');
            res.redirect('/annexure-2/swayam');
        } else {
            res.render('annexure-2/swayam', { editResult: result });
        }
    });
});

// Short Term Training conf load route
router.get('/shortTermTraining/edit/:id', ensureAuthenticated, (req, res) => {
    ShortTermTraining.findOne({_id: req.params.id})
    .then(result => {
        if(result.user != req.user.id) {
            req.flash('error_msg', 'Not Authorized');
            res.redirect('/annexure-2/shortTermTraining');
        } else {
            res.render('annexure-2/shortTermTraining', { editResult: result });
        }
    });
});

// Seminars conf load route
router.get('/seminars/edit/:id', ensureAuthenticated, (req, res) => {
    Seminars.findOne({_id: req.params.id})
    .then(result => {
        if(result.user != req.user.id) {
            req.flash('error_msg', 'Not Authorized');
            res.redirect('/annexure-2/seminars');
        } else {
            res.render('annexure-2/seminars', { editResult: result });
        }
    });
});

//////////////////////
/////////////////////////
/////////////////////////
///////////////////////////////////////////////////
////////////////



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
        link: req.body.link,
        user: req.user.id
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
        link: req.body.link,
        user: req.user.id
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
        link: req.body.link,
        user: req.user.id
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
        certification_status: req.body.certification_status,
        user: req.user.id
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
        certification_status: req.body.certification_status,
        user: req.user.id
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
        internal_external: req.body.internal_external,
        name_of_institue: req.body.name_of_institue,
        user: req.user.id
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
        internal_external: req.body.internal_external,
        name_of_institue: req.body.name_of_institue,
        user:req.user.id
    }
    new Seminars(seminarsRecords)
        .save()
        .then(seminars => {
            req.flash('success_msg', 'Data entered successfully');
            res.redirect('/annexure-3/resourcePerson');
        });
});

// PUT request
router.put('/papersPublishedinNationalConf/:id', (req, res) => {
    PapersPublishedNationalConf.findOne({ _id: req.params.id })
    .then(result => {
        result.title_of_paper_published = req.body.title_of_paper_published,
        result.published_date = req.body.published_date,
        result.name_of_conference = req.body.name_of_conference,
        result.isbn_issn_number = req.body.isbn_issn_number,
        result.name_of_coauthor = req.body.name_of_coauthor,
        result.impact_factor = req.body.impact_factor,
        result.no_of_citations = req.body.no_of_citations,
        result.rating = req.body.rating,
        result.link = req.body.link

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-2/papersPublishedinNationalConf');
        })
    })
});

router.put('/papersPublishedinInternationalConf/:id', (req, res) => {
    PapersPublishedInternationalConf.findOne({ _id: req.params.id })
    .then(result => {
        result.title_of_paper_published = req.body.title_of_paper_published,
        result.published_date = req.body.published_date,
        result.name_of_conference = req.body.name_of_conference,
        result.isbn_issn_number = req.body.isbn_issn_number,
        result.name_of_coauthor = req.body.name_of_coauthor,
        result.impact_factor = req.body.impact_factor,
        result.no_of_citations = req.body.no_of_citations,
        result.rating = req.body.rating,
        result.link = req.body.link

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-2/papersPublishedinInternationalConf');
        })
    })
});

router.put('/papersPublishedinJournals/:id', (req, res) => {
    PapersPublishedJournals.findOne({ _id: req.params.id })
    .then(result => {
        result.title_of_paper_published = req.body.title_of_paper_published,
        result.published_date = req.body.published_date,
        result.name_of_conference = req.body.name_of_conference,
        result.isbn_issn_number = req.body.isbn_issn_number,
        result.name_of_coauthor = req.body.name_of_coauthor,
        result.impact_factor = req.body.impact_factor,
        result.no_of_citations = req.body.no_of_citations,
        result.rating = req.body.rating,
        result.link = req.body.link

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-2/papersPublishedinJournals');
        })
    })
});

router.put('/moocs/:id', (req, res) => {
    Moocs.findOne({ _id: req.params.id })
    .then(result => {
        result.name_of_moocs_undertaken = req.body.name_of_moocs_undertaken,
        result.moocs_date = req.body.moocs_date,
        result.moocs_duartion = req.body.moocs_duartion,
        result.certification_status = req.body.certification_status

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-2/moocs');
        })
    })
});

router.put('/swayam/:id', (req, res) => {
    Swayam.findOne({ _id: req.params.id })
    .then(result => {
        result.name_of_swayam_undertaken = req.body.name_of_swayam_undertaken,
        result.swayam_date = req.body.swayam_date,
        result.swayam_duartion = req.body.swayam_duartion,
        result.certification_status = req.body.certification_status

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-2/swayam');
        })
    })
});

router.put('/shortTermTraining/:id', (req, res) => {
    ShortTermTraining.findOne({ _id: req.params.id })
    .then(result => {
        result.short_term_training = req.body.short_term_training,
        result.techonology = req.body.techonology,
        result.duration_of_course = req.body.duration_of_course,
        result.start_date = req.body.start_date,
        result.end_date = req.body.end_date,
        result.internal_external = req.body.internal_external,
        result.name_of_institue = req.body.name_of_institue

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-2/shortTermTraining');
        })
    })
});

router.put('/seminars/:id', (req, res) => {
    Seminars.findOne({ _id: req.params.id })
    .then(result => {
        result.short_term_training = req.body.short_term_training,
        result.techonology = req.body.techonology,
        result.duration_of_course = req.body.duration_of_course,
        result.start_date = req.body.start_date,
        result.end_date = req.body.end_date,
        result.internal_external = req.body.internal_external

        result.save()
        .then(() => {
            req.flash('success_msg', 'Data updated successfully');
            res.redirect('/annexure-2/seminars');
        })
    })
});

// DELETE route
router.delete('/papersPublishedinNationalConf/delete/:id', (req, res) => {
    PapersPublishedNationalConf.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successully');
        res.redirect('/annexure-2/papersPublishedinNationalConf');
    })
});

router.delete('/papersPublishedinInternationalConf/delete/:id', (req, res) => {
    PapersPublishedInternationalConf.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successully');
        res.redirect('/annexure-2/papersPublishedinInternationalConf');
    })
});

router.delete('/paperPublishedinJournals/delete/:id', (req, res) => {
    PapersPublishedJournals.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successully');
        res.redirect('/annexure-2/paperPublishedinJournals');
    })
});

router.delete('/moocs/delete/:id', (req, res) => {
    Moocs.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successully');
        res.redirect('/annexure-2/moocs');
    })
});

router.delete('/swayam/delete/:id', (req, res) => {
    Swayam.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successully');
        res.redirect('/annexure-2/swayam');
    })
});

router.delete('/shortTermTraining/delete/:id', (req, res) => {
    ShortTermTraining.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successully');
        res.redirect('/annexure-2/shortTermTraining');
    })
});

router.delete('/seminars/delete/:id', (req, res) => {
    Seminars.deleteOne({ _id: req.params.id })
    .then(() => {
        req.flash('success_msg', 'Data deleted successully');
        res.redirect('/annexure-2/seminars');
    })
});

module.exports = router;