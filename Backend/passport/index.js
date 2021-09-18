const passport = require('passport');
const User = require('../models/User');
const google = require('./googleStrategy');

function passportConfigure() {
    // req.session 에 회원 아이디 저장
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        User.findOne({sns_id: user.sns_id})
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    google();

}

module.exports = passportConfigure;
