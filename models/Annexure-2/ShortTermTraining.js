const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ShortTermTraining = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    short_term_training: {
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
        type: String,
        required: true
    },

    end_date: {
        type: String,
        required: true
    },
    internal_external: {
        type: String,
        required: true
    },
    name_of_institue: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('Short-term-training', ShortTermTraining);