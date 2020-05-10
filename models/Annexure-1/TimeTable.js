const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const TimeTable = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    role: {
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
    user: {
        type: String,
        required: true
    }
});

mongoose.model('timetable', TimeTable);