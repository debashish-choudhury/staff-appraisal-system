const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ClassAdvisor = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    class_name: {
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
    duties: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('classadvisor', ClassAdvisor);