const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const AddedExp = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    subject_name: {
        type: String,
        required: true,
        default: "-"
    },
    class: {
        type: String,
        required: true,
        default: "-"
    },
    semester: {
        type: String,
        required: true,
        default: "-",
    },
    exp_name: {
        type: String,
        required: true,
        default: "-"
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('addedexp', AddedExp);