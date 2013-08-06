var repo = require('../../repositories/repository'),
    errors = require('../errors');

var catRepo = new repo.Repository('Category');

module.exports.getAll = function (req, res) {
  catRepo.FindAll({}, function (err, categories) {
    if (err) {
      errors.handler500(req, res);
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(categories));
      res.end();
    }
  }, true);
};

module.exports.getById = function (req, res) {
    catRepo.FindById(req.params.id, function (err, category) {
        if (err) {
            errors.handler500(req, res);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(category));
            res.end();
        }
    });
};

//    productRepo.Save({
//      title : 'String',
//      decription : 'String',
//      price : 12.23,
//      img_url : 'String'
//    }, function (err) {
//      console.log(err);
//    });

//    productRepo.FindAll({}, function(err, prods) {
//        if (err) {
//            console.log(err);
//        }
//        //console.log(prods);
//        catRepo.Save({
//            title : 'String',
//            decription : 'String',
//            products : prods,
//            img_url : 'String'
//        }, function (err) {
//            console.log(err);
//        });
//    })
//
//    return res.render('index');
//};