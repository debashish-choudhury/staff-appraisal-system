const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ExternalProjectsOrCompetition = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contribution: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('external_projects_or_competition', ExternalProjectsOrCompetition);