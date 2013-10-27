module.exports.index = function (req, res) {
  return res.render('frontend/index');
};

module.exports.admin = function (req, res) {
    return res.render('backend/index');
};

module.exports.partial = function (req, res) {
  var folder = req.params.folder,
      view = req.params.view;

  return res.render(folder + '/' + view);
};

module.exports.templates = function (req, res) {


    return res.render('templates/' + req.params.name);
};