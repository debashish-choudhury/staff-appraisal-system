const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ConsultancyAssignment = new Schema({
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
    }
});

mongoose.model('consultancy_assignment', ConsultancyAssignment);