var repo = require('../../repositories/repository'),
    errors = require('../errors');

//var catRepo = new repo.Repository('Category');

module.exports.login = function (req, res) {

    if (req.signedCookies.user) {
        var user = req.signedCookies.user;
    }

  var login = req.body.login,
      password = req.body.password;

    if (login && password) {
        res.json({ success : true });
    } else {
        res.json({ success : false });
    }

    res.cookie('user', login, { signed: true });
};

module.exports.logout = function (req, res) {

    if (req.signedCookies.user) {
       var user = req.signedCookies.user;
    }

    res.clearCookie('user', { path: '/' });
    res.json({ success : true });
};