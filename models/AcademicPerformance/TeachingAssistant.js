const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const TeachingAssistant = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    faculty_name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    year_check: {
        type: Schema.Types.ObjectId,
        ref: 'academic_year'
    }
});

mongoose.model('teachingassistant', TeachingAssistant);