const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ContributionToSyllabus = new Schema({
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
    }
});

mongoose.model('Contribution_to_Syllabus', ContributionToSyllabus);