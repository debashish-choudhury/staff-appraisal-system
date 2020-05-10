const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const AcademicYear = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('academic_year', AcademicYear, 'academic_year');