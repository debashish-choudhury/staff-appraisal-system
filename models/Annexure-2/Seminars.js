const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const Seminars = new Schema({
    name_of_seminar: {
        type: String,
        required: true
    },
    techonology: {
        type: String,
        required: true
    },
    duration_of_course: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },

    end_date: {
        type: Date,
        required: true
    },
    internal_external: {
        type: String,
        required: true
    }
});

mongoose.model('seminars', Seminars);