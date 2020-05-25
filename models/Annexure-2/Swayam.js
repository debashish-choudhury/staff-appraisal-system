const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const Swayam = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    name_of_swayam_undertaken: {
        type: String,
        required: true
    },
    swayam_date: {
        type: String,
        required: true
    },
    swayam_duartion: {
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

mongoose.model('swayam', Swayam);