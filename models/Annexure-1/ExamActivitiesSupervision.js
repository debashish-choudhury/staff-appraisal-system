const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ExamActivitiesSupervision = new Schema({
    exam_role: {
        type: String,
        required: true
    },
    exam_name: {
        type: String,
        required: true
    },
    morning_sessions: {
        type: Number,
        required: true
    },
    evening_sessions: {
        type: Number,
        required: true
    },
    no_of_supervision_days: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('examactivitiessupervision', ExamActivitiesSupervision);