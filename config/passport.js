/**
 * Created by Ashok on 04-05-2015.
 */

var LocalStrategy, User, mongoose, config;

mongoose = require("mongoose");
LocalStrategy = require("passport-local").Strategy;
config = require('../config/configurations');
User = require('../app/models/users');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        return done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        return User.findOne({
            _id: id
        }, function(err, user) {
            return done(err, user);
        });
    });
    passport.use(new LocalStrategy(
        function(email, password, done) {
            User.findOne({email: email},'name email user_role', function(err, user) {
                if(err) {
                    return done(err);
                }
                if(!user) {
                    return done(null, false, {message: 'Incorrect email.'});
                }
                return done(null, user);
            });
        }
    ))
};