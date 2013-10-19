var mongoose = require('mongoose'),
    logger = require('custom/logger').logger;

var Schema = mongoose.Schema;

var productSchema = new Schema({
  title : String,
  description : String,
  price : Number,
  img_url : String,
  categories: [String]
}, {
  _id: false,
  autoIndex: false
});

productSchema.index({title: 1}, {unique: true});

var Product = mongoose.model('Product', productSchema);

mongoose.connection.db.collectionNames(function (err, names) {
    if(err) {
        return logger.error(err);
    }

    for (var i = 0; i< names.length; i++) {
        if (names[i].name.indexOf('products') !== -1) {
            return;
        }
    }

    Product.ensureIndexes(function (err) {
        if (err) return logger.error(err);
        logger.info('Product indexes created');
    });
});

module.exports = Product;