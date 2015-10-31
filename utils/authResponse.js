exports.loginResponse = function (req, res, err, user, info) {
    var response, userSession;
    if (err || !user) {
        response = {
            code: 0
        };
        if (info) {
            response.message = info.message;
        } else {
            response.message = 'Something wrong happened during the login';
        }
        if (req.is('html')) {
            return res.redirect('/login?err=' + encodeURIComponent(JSON.stringify(response)));
        }
        res.send({error: err});
    } else {
        if (!user.user_role.code) {
            response = {};
            res.redirect('/login?err=' + encodeURIComponent(JSON.stringify(response)));
            return;
        }
        userSession = {
            id: user.id,
            role: {
                name: user.user_role.name,
                code: user.user_role.code
            },
            name: user.name
        };
        req.session.user = userSession;
        res.cookie('user', JSON.stringify({
            name: user.name
        }));
        if (req.is('html')) {
            res.redirect('/');
        }
        res.send(user);
    }
};