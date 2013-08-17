var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    title : String,
    description : String,
    //products : [require('./product')],
    img_url : String
});

module.exports = mongoose.model('Category', categorySchema);