const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const PlacementActivities = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    placement_role: {
        type: String,
        required: true
    },
    no_of_companies: {
        type: Number,
        required: true
    },
    no_of_placed_students: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('placementactivities', PlacementActivities);