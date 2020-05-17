const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();
require('dotenv').config();
// Load faculty model
require('../models/Users/Faculty');
const Faculty = mongoose.model('users');

// Load HOD model
require('../models/Users/Hod');
const Hod = mongoose.model('hod');

// Load Manager model
require('../models/Users/ManagerDB');
const Manager = mongoose.model('management_user');

// Reset password for faculty
router.get('/faculty', function (req, res) {
    res.render('users/faculty/forgot');
});

router.post('/faculty', function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            Faculty.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    req.flash('error_msg', 'No account with that email address exists.');
                    return res.redirect('/users/faculty/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 600000; // 10 mins

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'apsit.appraisal@gmail.com',
                    pass: process.env.PASSWD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'apsit.appraisal@gmail.com',
                subject: 'Apsit Appraisal System Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/forgot/reset/faculty/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('mail sent');
                req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/users/faculty/forgot');
    });
});

router.get('/reset/faculty/:token', function (req, res) {
    Faculty.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/users/faculty/forgot');
        }
        res.render('users/faculty/reset', { token: req.params.token });
    });
});

router.post('/reset/faculty/:token', function (req, res) {
    async.waterfall([
        function (done) {
            Faculty.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    req.flash('error_msg', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) throw err;
                            user.password = hash;
                            user.save()
                                .then(user => {
                                    req.flash('success_msg', 'Password Changed for user ' + user.email + ' successfully');
                                    res.redirect('/users/faculty/login')
                                    done(err, user);
                                });
                        });
                    });
                } else {
                    req.flash("error_msg", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        function (user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'apsit.appraisal@gmail.com',
                    pass: process.env.PASSWD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'apsit.appraisal@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success_msg', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        res.redirect('/users/faculty/login');
    });
});

// Reset password for HoD
router.get('/hod', function (req, res) {
    res.render('users/hod/forgot');
});

router.post('/hod', function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            Hod.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    req.flash('error_msg', 'No account with that email address exists.');
                    return res.redirect('/users/hod/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 600000; // 10 mins

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'apsit.appraisal@gmail.com',
                    pass: process.env.PASSWD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'apsit.appraisal@gmail.com',
                subject: 'Apsit Appraisal System Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/forgot/reset/hod/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('mail sent');
                req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/users/hod/forgot');
    });
});

router.get('/reset/hod/:token', function (req, res) {
    Hod.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/users/hod/forgot');
        }
        res.render('users/hod/reset', { token: req.params.token });
    });
});

router.post('/reset/hod/:token', function (req, res) {
    async.waterfall([
        function (done) {
            Hod.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    req.flash('error_msg', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) throw err;
                            user.password = hash;
                            user.save()
                                .then(user => {
                                    req.flash('success_msg', 'Password Changed for user ' + user.email + ' successfully');
                                    res.redirect('/users/hod/login')
                                    done(err, user);
                                });
                        });
                    });
                } else {
                    req.flash("error_msg", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        function (user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'apsit.appraisal@gmail.com',
                    pass: process.env.PASSWD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'apsit.appraisal@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success_msg', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        res.redirect('/users/hod/login');
    });
});

// Reset password for Manager
router.get('/manager', function (req, res) {
    res.render('users/management/forgot');
});

router.post('/manager', function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            Manager.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    req.flash('error_msg', 'No account with that email address exists.');
                    return res.redirect('/users/manager/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 600000; // 10 mins

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'apsit.appraisal@gmail.com',
                    pass: process.env.PASSWD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'apsit.appraisal@gmail.com',
                subject: 'Apsit Appraisal System Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/forgot/reset/manager/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('mail sent');
                req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/users/manager/forgot');
    });
});

router.get('/reset/manager/:token', function (req, res) {
    Manager.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/users/hod/forgot');
        }
        res.render('users/management/reset', { token: req.params.token });
    });
});

router.post('/reset/manager/:token', function (req, res) {
    async.waterfall([
        function (done) {
            Manager.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    req.flash('error_msg', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) throw err;
                            user.password = hash;
                            user.save()
                                .then(user => {
                                    req.flash('success_msg', 'Password Changed for user ' + user.email + ' successfully');
                                    res.redirect('/users/management/login')
                                    done(err, user);
                                });
                        });
                    });
                } else {
                    req.flash("error_msg", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        function (user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'apsit.appraisal@gmail.com',
                    pass: process.env.PASSWD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'apsit.appraisal@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success_msg', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        res.redirect('/users/management/login');
    });
});



module.exports = router;