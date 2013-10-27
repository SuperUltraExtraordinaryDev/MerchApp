module.exports.handler500 = function (req, res) {
  res.status(500);
  return res.render('errors/500');
};

module.exports.handler404 = function (req, res) {
    res.status(404);
    return res.render('errors/404');
};