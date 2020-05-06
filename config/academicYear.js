const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/AcademicYear');
const AcademicYear = mongoose.model('academic_year');

module.exports = AcademicYear;
