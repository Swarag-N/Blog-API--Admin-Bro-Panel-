var mongoose = require('mongoose');
//Mongoosee Config
var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	info:String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);
