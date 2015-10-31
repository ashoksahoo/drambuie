/**
 * Created by Ashok on 04-05-2015.
 */
var onUnAuthorizedAccess;


onUnAuthorizedAccess = function (req, res) {
    res.status(403);
    return res.send();
};

exports.isAdmin = function (req, res, next) {
    if (req.session && req.session.user && req.session.user.role.code === 10) {
        return next();
    }
    return onUnAuthorizedAccess(req, res);
};

exports.isLoggedIn = function (req, res, next) {
    if (req.session && req.session.user) {
        next();

    } else {
        onUnAuthorizedAccess(req, res, true);
    }
};
