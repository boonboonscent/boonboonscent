const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const dotenv = require('dotenv');
dotenv.config();

function google() {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                const user = await User.findOne({sns_id: profile.id, provider: 'google'});
                if (user) {
                    done(null, user);
                } else { // 회원가입
                    const newUser = await User.create({sns_id: profile.id, provider: 'google', nickname: profile.displayName});
                    done(null, newUser);
                }
            } catch (err) {
                console.error(err);
                done(err);
            }
        }
    ));
}

module.exports = google;

