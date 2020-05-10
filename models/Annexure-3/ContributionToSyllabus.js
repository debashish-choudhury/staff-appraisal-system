const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ContributionToSyllabus = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    nameofSub: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    nameofUniversity: {
        type: String,
        required: true
    },

    otherDetails: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('Contribution_to_Syllabus', ContributionToSyllabus);