const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ResourcePerson = new Schema({
    topicName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    nameofInstitute: {
        type: String,
        required: true
    },

    numberofParticipants: {
        type: Number,
        required: true
    }
});

mongoose.model('resource_person', ResourcePerson);