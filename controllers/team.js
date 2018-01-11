//dependencies
const mongoose = require('mongoose');


//Character Schema
var CharacterSchema = mongoose.Schema({
	name : String,
	description : String,
	image : String
});

var newCharacter = mongoose.model('newCharacter', CharacterSchema);

module.exports = newCharacter;