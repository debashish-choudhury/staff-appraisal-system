const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const PreLeave = new Schema({
    pre_casual_leave: {
        type: Number,
        required: true
    },
    pre_outdoor_leave: {
        type: Number,
        required: true
    },
    pre_medical_leave: {
        type: Number,
        required: true
    },
    pre_special_leave: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('preleaves', PreLeave);