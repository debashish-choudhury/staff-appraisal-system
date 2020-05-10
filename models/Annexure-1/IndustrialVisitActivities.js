const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const IndustrialVisitActivities = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    industrial_visit_role: {
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
    industrial_visit_days: {
        type: Number,
        required: true
    },
    industrial_visit_organizer: {
        type: String,
        required: true
    },
    name_of_company: {
        type: String,
        required: true
    },
    iv_description: {
        type: String,
        required: true
    },
    industrial_visit_hrs: {
        type: Number,
        required: true
    },
    iv_start_date: {
        type: String,
        required: true
    },
    iv_end_date: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('industrialvisit', IndustrialVisitActivities);