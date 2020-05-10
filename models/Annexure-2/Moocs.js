const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const Moocs = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    name_of_moocs_undertaken: {
        type: String,
        required: true
    },
    moocs_date: {
        type: String,
        required: true
    },
    moocs_duartion: {
        type: Number,
        required: true
    },
    certification_status: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('moocs', Moocs);