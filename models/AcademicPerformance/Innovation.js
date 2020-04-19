const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const Innovation = new Schema({
    subject_name: {
        type: String,
        required: true,
        default: null
    },
    class_name: {
        type: String,
        required: true,
        default: null
    },
    semester: {
        type: String,
        required: true,
        default: null
    },
    technique: {
        type: String,
        required: true,
        default: null
    },
    user: {
        type: String,
        required: true
    }
});
mongoose.model('innovation', Innovation);