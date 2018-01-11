//dependencies
const mongoose = require('mongoose');


//User Schema
var UserSchema = mongoose.Schema({
	name : String,
	email : String,
	password : String
});


var User = mongoose.model('User', UserSchema);

module.exports = User;