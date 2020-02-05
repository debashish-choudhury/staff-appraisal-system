const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();


// Load faculty model
require('../models/Users/Faculty');
const Faculty = mongoose.model('users');

// Load HOD model
require('../models/Users/Hod');
const Hod = mongoose.model('hod');

// User register form
router.get('/register', (req, res) => {
    res.render('users/register');
});

// faculty user login form
router.get('/faculty/login', (req, res) => {
    res.render('users/faculty/login');
});

// hod user login form
router.get('/hod/login', (req, res) => {
    res.render('users/hod/login');
});

// User register form
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.get("/faculty/home", function(req, res){
    res.send("hi student")
  });
  
  router.get("/hod/home", function(req, res){
    res.send("hi teacher")  
  });

// router.post('/faculty/login', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/users/login',
//         failureFlash: true
//     })(req, res, next);
// });

router.post('/faculty/login',
    passport.authenticate('faculty', { successRedirect: '/', failureRedirect: '/users/faculty/login', failureFlash: true }));

router.post('/hod/login',
    passport.authenticate('hod', { successRedirect: '/', failureRedirect: '/users/hod/login', failureFlash: true }));


// router.post('/hod/login', (req, res) => {
//     var password = req.body.password;
//     User.findOne({
//         email: req.body.email
//     }).then(user => {
//         if (user.select_user === 'faculty') {
//             req.flash('error_msg', 'User not found');
//             res.redirect('/users/login');
//         }
//         else {
//             if (user) {
//                 bcrypt.compare(password, user.password, (err, isMatch) => {
//                     if (err) throw err;
//                     if (isMatch) {
//                         req.flash('success_msg', 'Successfully Logged In');
//                         res.redirect('/')
//                     } else {
//                         req.flash('error_msg', 'Password Incorrect');
//                         res.redirect('/users/login');
//                     }
//                 })
//             }
//             else {
//                 req.flash('error_msg', 'No user found');
//                 res.redirect('/users/login');
//             }
//         }
//     });
// });

// Register Form POST
router.post('/register', (req, res) => {
    var type = req.body.type;
    if (type === 'faculty') {
        let errors = [];
        if (req.body.password != req.body.password2) {
            errors.push({ text: 'Password do not match' });
        }
        if (req.body.password.length < 4) {
            errors.push({ text: 'Password must be atleast 4 characters' });
        }
        if (errors.length > 0) {
            res.render('users/register', {
                errors: errors,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                password2: req.body.password2
            });
        } else {
            Faculty.findOne({ email: req.body.email })
                .then(user => {
                    if (user) {
                        req.flash('error_msg', 'Email already registered');
                        res.redirect('/users/faculty/login');
                    } else {
                        const newUser = new Faculty({
                            name: req.body.name,
                            email: req.body.email,
                            type: req.body.type,
                            password: req.body.password
                        });

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', 'You are now registered and can login');
                                        res.redirect('/users/faculty/login')
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        return;
                                    });
                            });
                        });
                    }
                })
        }
    } else if (type === 'hod') {
        let errors = [];
        if (req.body.password != req.body.password2) {
            errors.push({ text: 'Password do not match' });
        }
        if (req.body.password.length < 4) {
            errors.push({ text: 'Password must be atleast 4 characters' });
        }
        if (errors.length > 0) {
            res.render('users/register', {
                errors: errors,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                password2: req.body.password2
            });
        } else {
            Hod.findOne({ email: req.body.email })
                .then(user => {
                    if (user) {
                        req.flash('error_msg', 'Email already registered');
                        res.redirect('/users/hod/login');
                    } else {
                        const newUser = new Hod({
                            name: req.body.name,
                            email: req.body.email,
                            type: req.body.type,
                            password: req.body.password
                        });

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        req.flash('success_msg', 'You are now registered and can login');
                                        res.redirect('/users/hod/login')
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        return;
                                    });
                            });
                        });
                    }
                })
        }
    }

});





// Logout user
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

module.exports = router;