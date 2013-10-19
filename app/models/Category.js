var mongoose = require('mongoose'),
    logger = require('custom/logger').logger;

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    title : String,
    description : String,
    img_url : String
}, {
    '_id': false,
    'id': false,
    autoIndex: false
});

categorySchema.index({title: 1}, {unique: true});

var Category = mongoose.model('Category', categorySchema);

var a = mongoose.connection.db.collectionNames(function (err, names) {
  if(err) {
    return logger.error(err);
  }

  for (var i = 0; i< names.length; i++) {
    if (names[i].name.indexOf('categories') !== -1) {
      return;
    }
  }

  Category.ensureIndexes(function (err) {
    if (err) return logger.error(err);
    logger.info('Category indexes created');
  });
});

module.exports = Category;