const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const STTP = new Schema({
    sttp_role: {
        type: String,
        required: true
    },
    no_of_sttp: {
        type: Number,
        required: true
    },
    sttp_technology: {
        type: String,
        required: true
    },
    sttp_duration: {
        type: Number,
        required: true
    },
    sttp_start_date: {
        type: String,
        required: true
    },
    sttp_end_date: {
        type: String,
        required: true
    },
    sttp_participants: {
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

mongoose.model('sttp', STTP);