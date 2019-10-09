const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ExamActivitiesCollegeLevel = new Schema({
    subject_name: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    exam_type: {
        type: String,
        required: true
    }
});

mongoose.model('examactivitiescollege', ExamActivitiesCollegeLevel);