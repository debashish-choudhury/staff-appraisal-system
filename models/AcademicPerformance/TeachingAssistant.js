const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const TeachingAssistant = new Schema({
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
    }
});

mongoose.model('teachingassistant', TeachingAssistant);