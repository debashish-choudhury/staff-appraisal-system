const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ConfidentialForm = new Schema({
    value1: {
        type: String,
        required: true
    },
    value2: {
        type: String,
        required: true
    },
    value3: {
        type: String,
        required: true
    },
    value4: {
        type: String,
        required: true
    },
    value5: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('confidential_form', ConfidentialForm);