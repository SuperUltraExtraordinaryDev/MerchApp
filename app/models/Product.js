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

mongoose.connection.db.collectionNames(function (err, names) {
    if(err) {
     return logger.error(err);
    } else {
      console.log(names);
    }
});

module.exports = mongoose.model('Product', productSchema);