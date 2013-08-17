var repo = require('../../repositories/repository'),
    errors = require('../errors');

//var catRepo = new repo.Repository('Category');

module.exports.login = function (req, res) {

  var login = req.body.login,
      password = req.body.password;

    //res.writeHead(200, { 'Content-Type': 'application/json' });
    if (login && password) {
        res.json(true);
    } else {
        res.write(JSON.stringify({ success : false }));
    }

    res.cookie('user', login, { signed: true });
    //res.end();
};

module.exports.logout = function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.clearCookie('user', { path: '/' });
    res.end();
};