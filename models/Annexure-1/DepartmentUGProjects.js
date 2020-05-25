const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const DepartmentUGProjects = new Schema({
    academic_year: {
        type: Number,
        required: true
    },
    dept_project_role: {
        type: String,
        required: true
    },
    project_title: {
        type: String,
        required: true
    },
    project_no_of_students: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

mongoose.model('department-ug-projects', DepartmentUGProjects);