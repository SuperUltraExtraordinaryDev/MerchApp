var repository = require('../repositories/repository');

var productRepo = new repository.Repository('Product');

var catRepo = new repository.Repository('Category');

module.exports.index = function (req, res) {
//    productRepo.Save({
//      title : 'String',
//      decription : 'String',
//      price : 12.23,
//      img_url : 'String'
//    }, function (err) {
//      console.log(err);
//    });

    productRepo.FindAll({}, function(err, prods) {
      if (err) {
          console.log(err);
      }
        //console.log(prods);
        catRepo.Save({
            title : 'String',
            decription : 'String',
            products : prods,
            img_url : 'String'
        }, function (err) {
          console.log(err);
        });
    })

    return res.render('index');
};

module.exports.partial = function (req, res) {
    var folder = req.params.folder,
        view = req.params.view;
    return res.render(folder + '/' + view);
};