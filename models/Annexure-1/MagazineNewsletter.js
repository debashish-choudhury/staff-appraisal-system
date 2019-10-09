const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const MagazineNewsletter = new Schema({
    class_name: {
        type: String,
        required: true
    },
    magazine_role: {
        type: String,
        required: true
    },
    magazineNewsletter_type: {
        type: String,
        required: true
    },
    year_of_publication: {
        type: Number,
        required: true
    }
});

mongoose.model('magazine-newsletter', MagazineNewsletter);