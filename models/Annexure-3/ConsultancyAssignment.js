const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ConsultancyAssignment = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    rolesAndResponsilbilty: {
        type: String,
        required: true
    },
    typeOfWorkorDomain: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    numberofVisits: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('consultancy_assignment', ConsultancyAssignment);