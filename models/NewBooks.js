const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const NewBooks = new Schema({
    subject_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    publication: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

mongoose.model('newbooks', NewBooks);