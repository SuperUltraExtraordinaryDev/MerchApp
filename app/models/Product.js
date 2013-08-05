var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
  title : String,
  decription : String,
  price : Number,
  img_url : String
});

module.exports = mongoose.model('Product', productSchema);