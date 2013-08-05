var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    title : String,
    decription : String,
    products : [mongoose.model('Product').schema],
    img_url : String
});

module.exports = mongoose.model('Category', categorySchema);