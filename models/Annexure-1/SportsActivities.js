const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const SportsActivities = new Schema({
    sports_name: {
        type: String,
        required: true
    },
    sports_category: {
        type: String,
        required: true
    },
    sports_role: {
        type: String,
        required: true
    },
    sports_ojus_or_other: {
        type: String,
        required: true
    }
});

mongoose.model('sportsactivities', SportsActivities);