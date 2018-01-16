//dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

//User Schema
var UserSchema = mongoose.Schema({
	name : String,
	email : String,
	password : String,
	favCharacter : String,
	favSuperPower : String
});

UserSchema.methods.encrypt = function(password) {
	console.log('encyrpted function');
	return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;