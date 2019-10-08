const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const Innovation = new Schema({
    subject_name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    technique: {
        type: String,
        required: true
    }
});

mongoose.model('innovation', Innovation);