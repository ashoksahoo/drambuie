/**
 * Created by Ashok on 04-05-2015.
 */
var User = require('../models/users');
var Property = require('../models/properties');
var _ = require('lodash');
var async = require('async');

exports.getProfile = function (user, callback) {
    User.findOne({_id: user.id}, callback)
};

exports.updateProfile = function (user, profile, callback) {
    User.findOne({_id: user.id}, function (err, obj) {
        _.extend(obj.profile, profile);
        obj.markModified("profile")
        obj.save(callback);
    });
};

exports.getProperties = function (page, callback) {
    Property.find({}).sort('-date').skip((page - 1) * 10).limit(10).exec(callback)
}