const passport = require('passport');
// const googleStratergy = require('passport-google-oauth20').OAuth2Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const crypto = require('crypto');
const User = require('../models/user');


passport.use(new GoogleStrategy({
    clientID: "906694001719-o60hq2ddfnd1ht2q02ekj98023klnvim.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",

},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log('error in google strategy- passport', err); return; }

            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);
            if (user) {
                return done(null, user);
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')

                }, function (err, user) {
                    if (err) { console.log('error in creating user google strategy- passport', err); return; }

                    return done(null, user);

                });
            }


        });

    }
));

module.exports = passport;