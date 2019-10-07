const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const TeachingRecord = new Schema({
    subject_name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },

    theory_subject: {
        type: Number,
        required: true
    },
    lab_subject: {
        type: Number,
        required: true
    },
    tutorials: {
        type: Number,
        required: true
    },
    theory_session: {
        type: Number,
        required: true
    },
    practical_session: {
        type: Number,
        required: true
    },
    Student_feedback: {
        type: Number,
        required: true
    }
});

mongoose.model('teachingload', TeachingRecord);