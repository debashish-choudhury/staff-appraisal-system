const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const CulturalActivities = new Schema({
    cultural_name: {
        type: String,
        required: true
    },
    cultural_category: {
        type: String,
        required: true
    },
    cultural_role: {
        type: String,
        required: true
    },
    cultural_ojus_or_other: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('culturalactivities', CulturalActivities);