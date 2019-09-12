const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const PostLeave = new Schema({
    post_casual_leave: {
        type: Number,
        required: true
    },
    post_outdoor_leave: {
        type: Number,
        required: true
    },
    post_medical_leave: {
        type: Number,
        required: true
    },
    post_special_leave: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('postleaves', PostLeave);