const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ProfileRecord = new Schema({
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
        type: Date,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

mongoose.model('profile', ProfileRecord);