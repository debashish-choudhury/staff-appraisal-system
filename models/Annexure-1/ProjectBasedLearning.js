const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ProjectBasedLearning = new Schema({
    pbl_subject: {
        type: String,
        required: true
    },
    pbl_role: {
        type: String,
        required: true
    },
    pbl_start_date: {
        type: Date,
        required: true
    },
    pbl_end_date: {
        type: Date,
        required: true
    },
    pbl_description: {
        type: String,
        required: true
    }
});

mongoose.model('projectbasedlearning', ProjectBasedLearning);