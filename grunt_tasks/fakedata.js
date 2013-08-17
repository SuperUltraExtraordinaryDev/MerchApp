var mongoose = require('mongoose'),
    config = require('../config');

// mongoose setup
mongoose.connect(config.MONGO_URI);

var repo = require('../app/repositories/repository'),
    catRepo = new repo.Repository('Category'),
    prodRepo = new repo.Repository('Product');

module.exports.init = function(){

   var done = this.async();

   for (var i = 0; i < 10; i++) {
       var c = {
           title : 'Cat' + i,
           description : 'Desc' + i,
           img_url : 'ImgUrl' + i
       };
       catRepo.Save(c, function(err){
           if (err) {
               console.log(err);
               done(false);
           }
       });
   }

    for (var i = 0; i < 10; i++) {
        var p = {
            title : 'Prod' + i,
            description : 'Desc' + i,
            price : 100 + i,
            img_url : 'ImgUrl' + i,
            cat_id : i
        };
        prodRepo.Save(p, function(err){
            if (err) {
                console.log(err);
                done(false);
            }

            done();
        });
    }

};