var repo = require('../../repositories/repository'),
    errors = require('../errors');

//var catRepo = new repo.Repository('Category');

module.exports.login = function (req, res) {
  var login = req.body.login,
      password = req.body.password,
      rememberMe = req.body.rememberMe;

    if (login && password) {
        req.session.auth = {
            user : login
        };
        res.json({ success : true });
    } else {
        res.json({ success : false });
    }

    if (rememberMe) {
        res.cookie('user', login, { signed: true });
    }
};

module.exports.isUserLoggedIn = function (req, res) {
    if (req.signedCookies.user) {
        var user = req.signedCookies.user;
        res.json( { success: true, username: user });
    } else if (req.session.auth) {
        res.json( { success: true, username: req.session.auth.user });
    }
    else {
        res.json( { success: false});
    }
};

module.exports.logout = function (req, res) {
    res.clearCookie('user', { path: '/' });
    req.session.auth = null;
    res.end();
};