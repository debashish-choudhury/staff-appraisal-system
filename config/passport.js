const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
// const User = mongoose.model('users');
const Faculty = mongoose.model('users');
const Hod = mongoose.model('hod');
const Manager = mongoose.model('management_user');

module.exports = function (passport) {
    // passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    //     // Match user
    //     User.findOne({
    //         email: email
    //     }).then(user => {
    //         if (!user) {
    //             return done(null, false, { message: 'No User Found' });
    //         }
    //         if(user.select_user === 'faculty') {    
    //             // Match password
    //         bcrypt.compare(password, user.password, (err, isMatch) => {
    //             if (err) throw err;
    //             if (isMatch) {
    //                 return done(null, user);
    //             } else {
    //                 return done(null, false, { message: 'Password Incorrect' });
    //             }
    //         })
    //         } else {
    //             return done(null, false, { message: 'User not found' });
    //         }

    //     })
    // }));

    passport.use('faculty', new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
        var query = { email: email };
        Faculty.findOne(query, function (err, faculty) {
            if (err) throw err;
            if (!faculty) {
                return done(null, false, { message: 'User Not found' });
            }
            bcrypt.compare(password, faculty.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch)
                    return done(null, faculty);
                else
                    return done(null, false, { message: 'Password do not match' });
            })
        });
    }));


    passport.use('hod', new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
        var query = { email: email };
        Hod.findOne(query, function (err, hod) {
            if (err) throw err;
            if (!hod) {
                return done(null, false, { message: 'User not found' });
            }
            bcrypt.compare(password, hod.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch)
                    return done(null, hod);
                else
                    return done(null, false, { message: 'Password do not match' });
            })
        });
    }))

    passport.use('management_user', new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
        var query = { email: email };
        Manager.findOne(query, function (err, manager) {
            if (err) throw err;
            if (!manager) {
                return done(null, false, { message: 'User not found' });
            }
            bcrypt.compare(password, manager.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch)
                    return done(null, manager);
                else
                    return done(null, false, { message: 'Password do not match' });
            })
        });
    }))


    // passport.serializeUser(function (user, done) {
    //     done(null, user.id);
    // });

    // passport.deserializeUser(function (id, done) {
    //     User.findById(id, function (err, user) {
    //         done(err, user);
    //     });
    // });

    passport.serializeUser(function (entity, done) {
        done(null, { id: entity.id, type: entity.type });
    });

    passport.deserializeUser(function (obj, done) {
        switch (obj.type) {
            case 'faculty':
                Faculty.findById(obj.id)
                    .then(user => {
                        if (user) {
                            done(null, user);
                        }
                        else {
                            done(new Error('user id not found:' + obj.id, null));
                        }
                    });
                break;
            case 'hod':
                Hod.findById(obj.id)
                    .then(user => {
                        if (user) {
                            done(null, user);
                        } else {
                            done(new Error('user id not found:' + obj.id, null));
                        }
                    });
                break;
            case 'manager':
                Manager.findById(obj.id)
                    .then(user => {
                        if (user) {
                            done(null, user);
                        }
                        else {
                            done(new Error('user id not found:' + obj.id, null));
                        }
                    });
                break;
            default:
                done(new Error('no entity type:', obj.type), null);
                break;
        }
    });
}