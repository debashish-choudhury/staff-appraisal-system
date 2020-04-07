const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const FacultyProfile = new Schema({
    faculty_name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    teaching_exp: {
        type: Number,
        required: true
    },
    appointment: {
        type: String,
        required: true
    },
    date_of_join: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('faculty_profile', FacultyProfile);