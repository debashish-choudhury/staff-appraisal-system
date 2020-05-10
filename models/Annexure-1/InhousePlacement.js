const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const InhousePlacement = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    trainings_and_workshops: {
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
    user: {
        type: String,
        required: true
    }
});

mongoose.model('inhouseplacement', InhousePlacement);