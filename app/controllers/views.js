module.exports.index = function (req, res) {
  return res.render('index');
};

module.exports.partial = function (req, res) {
  var folder = req.params.folder,
      view = req.params.view;

  return res.render(folder + '/' + view);
};