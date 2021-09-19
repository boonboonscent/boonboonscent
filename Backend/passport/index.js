const passport = require('passport');
const User = require('../models/User');
const google = require('./googleStrategy');

function passportConfigure() {
    // req.session 에 user._id 저장
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    // id로부터 user를 찾아 req.user에 저장
    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    google();

}

module.exports = passportConfigure;
