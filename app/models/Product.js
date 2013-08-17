var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
  title : String,
  description : String,
  price : Number,
  img_url : String,
  cat_id : String
});

module.exports = mongoose.model('Product', productSchema);