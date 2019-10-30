const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const Studentorganization = new Schema({
    student_organizations_trainings: {
        type: String,
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
    no_of_participants: {
        type: Number,
        required: true
    },
    student_organization_role: {
        type: String,
        required: true
    },
    student_event_duration: {
        type: Number,
        required: true
    },
    student_event_start_date: {
        type: String,
        required: true
    },
    student_event_end_date: {
        type: String,
        required: true
    },
});

mongoose.model('studentorganizations', Studentorganization);