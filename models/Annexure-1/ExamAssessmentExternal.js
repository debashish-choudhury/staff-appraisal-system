const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ExamAssessmentExternal = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    exam_role_external: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    name_of_college_university: {
        type: String,
        required: true
    },
    exam_subject_external: {
        type: String,
        required: true
    },
    outdoor_activities: {
        type: Number,
        required: true
    },
    papers_revaluated: {
        type: Number,
        required: true
    },
    papers_moderated: {
        type:Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('examassessmetnexternal', ExamAssessmentExternal);