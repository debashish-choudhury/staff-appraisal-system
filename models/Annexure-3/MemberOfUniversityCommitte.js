const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const MemberOfUniversityCommite = new Schema({
    nameofCommittee: {
        type: String,
        required: true
    },
    rolesAndResponsibility: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('Member_of_University_Commite', MemberOfUniversityCommite);