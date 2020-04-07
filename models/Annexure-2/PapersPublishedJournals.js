const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const PapersPublishedJournals = new Schema({
    title_of_paper_published: {
        type: String,
        required: true
    },
    published_date: {
        type: String,
        required: true
    },
    name_of_conference: {
        type: String,
        required: true
    },
    isbn_issn_number: {
        type: Number,
        required: true
    },

    name_of_coauthor: {
        type: String,
        required: true
    },
    impact_factor: {
        type: String,
        required: true
    },
    no_of_citations: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        default: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('paper-published-journals', PapersPublishedJournals);