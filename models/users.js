//dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

//User Schema
var UserSchema = mongoose.Schema({
	name : String,
	email : String,
	password : String
});

UserSchema.methods.encrypt = function(password) {
	console.log('encyrpted function');
	return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

var User = mongoose.model('User', UserSchema);

module.exports = User;