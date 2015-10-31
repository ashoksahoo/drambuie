/**
 * Created by Ashok on 04-05-2015.
 */
var services = require('../services/');
var _ = require('lodash');
var async = require('async');


exports.getProfile = function (req, res, next) {
    var user = req.session.user;
    var callback = function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(obj);
    };
    services.getProfile(user, callback);
};

exports.updateProfile = function (req, res, next) {
    var user = req.session.user;
    var profile;
    if (user.role.code == 1) {
        profile = {};
    }
    else
        profile = {};
    var callback = function (err, obj) {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.send(obj);
    };
    services.updateProfile(user, profile, callback);

};
