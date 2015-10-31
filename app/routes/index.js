var authResponse = require('../../utils/authResponse');
var auth = require('../../utils/authMiddleware');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var controller = require('../controllers/user');

/* GET home page. */

module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('index')
    });
    //login
    app.get('/login', function (req, res, next) {
        res.render('login');
    });
    app.get('/logout', function (req, res, next) {
        req.session.destroy();
        res.redirect('/login');
    });
    //candidates
    app.post('/profile', auth.isLoggedIn, controller.updateProfile);
    app.get('/profile', auth.isLoggedIn, controller.updateProfile);

    app.post('/api/login', function (req, res, next) {
        return passport.authenticate('local', function (err, user, info) {
            return authResponse.loginResponse(req, res, err, user, info);
        })(req, res, next);
    });

};