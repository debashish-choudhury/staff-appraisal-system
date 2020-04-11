const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const HodMarks = new Schema({
    faculty_name: {
        type: String,
        required: true
    },
    faculty_email: {
        type: String,
        required: true
    },
    academicPerformance: {
        type: Number,
        required: true
    },
    leaveRecord: {
        type: Number,
        required: true
    },
    annexure_1: {
        type: Number,
        required: true
    },
    annexure_2: {
        type: Number,
        required: true
    },
    annexure_3: {
        type: Number,
        required: true
    },
    confidential: {
        type: Number,
        require: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('hod-marks', HodMarks, 'hod-marks');