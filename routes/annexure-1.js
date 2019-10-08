const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Time table load route
router.get('/timeTable', (req, res) => {
    res.render('annexure-1/timeTable');
});

// Class advisor load route
router.get('/classAdvisor', (req, res) => {
    res.render('annexure-1/classAdvisor');
});

// Sports activity load route
router.get('/sportsActivities', (req, res) => {
    res.render('annexure-1/sportsActivities');
});

// Cultural activity load route
router.get('/culturalActivities', (req, res) => {
    res.render('annexure-1/culturalActivities');
});

module.exports = router;