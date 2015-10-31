/**
 * Created by Ashok on 04-05-2015.
 */
var User = require('../models/users');
var _ = require('lodash');
var async = require('async');

exports.getCandidates = function (user, callback) {
    async.parallel({
        candidates: function (callback) {
            User.find({'user_role.code': 1}, callback)
        },
        starred: function (callback) {
            User.findOne({_id: user.id}, 'starred', callback)
        }
    }, callback);
};
exports.getCandidate = function (id, user, mainCallback) {
    async.parallel({
        candidate: function (callback) {
            User.findById(id).populate('starred').exec(callback)
        },
        note: function (callback) {
            Notes.findOne({note_for: id, user: user.id}, callback)
        }
    }, mainCallback);
};
exports.getStartups = function (user, callback) {
    async.parallel({
        startups: function (callback) {
            User.find({'user_role.code': 2}, callback)
        },
        starred: function (callback) {
            User.findOne({_id: user.id}, 'starred', callback)
        }
    }, callback);
};
exports.getStartup = function (id, user, mainCallback) {
    async.parallel({
        startup: function (callback) {
            User.findById(id).populate('starred').exec(callback)
        },
        note: function (callback) {
            Notes.findOne({note_for: id, user: user.id}, callback)
        }
    }, mainCallback);
};
exports.getProfile = function (user, callback) {
    User.findOne({_id: user.id}, callback)
};

exports.updateProfile = function (user, profile, callback) {
    User.findOne({_id: user.id}, function (err, obj) {
        if (err) {
            return callback(err)
        }
        if (user.role.code == 1) {
            _.extend(obj.candidate, profile);
            obj.markModified("candidate")
        } else {
            _.extend(obj.startup, profile);
            obj.markModified("startup")
        }
        obj.save(callback);
    });
};

exports.saveNote = function (note, callback) {
    Notes.findOneAndUpdate({note_for: note.note_for, user: note.user}, note, {upsert: true}, callback)
};

exports.shortList = function (user, id, callback) {
    User.findOne({_id: user.id}, function (err, obj) {
            if (err) {
                return callback(err)
            }
            if (obj.starred) {
                var index = obj.starred.indexOf(id);
                if (index !== -1) {
                    callback("You already shortlisted this.", true)
                }
                else if (obj.starred.length < 20) {
                    obj.starred.push(id);
                    obj.save(callback)
                } else {
                    callback("You already shortlisted 10", true)
                }
            } else {
                obj.starred = [];
                obj.starred.push(id);
                obj.save(callback)
            }
        }
    )
};
exports.shortListed = function (user, callback) {
    User.findOne({_id: user.id}, 'starred')
        .populate('starred')
        .exec(function (err, obj) {
                if (err) {
                    return callback(err)
                }
                if (obj.starred) {
                    callback(null, obj)
                } else {
                    obj.starred = [];
                    obj.save();
                    callback('None Shotlisted.')
                }
            }
        )
};
exports.removeShortList = function (user, id, callback) {
    User.findOne({_id: user.id}, function (err, obj) {
            if (err) {
                return callback(err)
            }
            if (obj.starred) {
                var index = obj.starred.indexOf(id);
                if (index > -1) {
                    obj.starred.splice(index, 1);
                }
                obj.save(callback)
            }
        }
    )
};

