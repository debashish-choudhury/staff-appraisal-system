const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const Lakshya = new Schema({
    lakshya_activities: {
        type: String,
        required: true
    },
    lakshya_description: {
        type: String,
        required: true
    },
    lakshya_date: {
        type: String,
        required: true
    },
    lakshya_no_of_participants: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('lakshya', Lakshya);