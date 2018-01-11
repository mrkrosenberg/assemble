//dependencies
const crypto = require('crypto');
const request = require('request');

//requires api keys
const key = require('../env.js').key;
const pubKey = require('../env.js').pubKey;

//requires model schemas
let db = require('../models');

function searchMarvel (req, res){
	// console.log(req.query.searchName);
	// console.log('key is ', key);
	// console.log('pubKey is ', pubKey);

	//hashing api keys and time stamp
	var timeStamp = Date.now();
	console.log(timeStamp);
	var string = timeStamp + key;

	var hash = crypto.createHash('md5').update(string).digest('hex');
	console.log(hash);

	//api url
	var apiUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=' + req.query.searchName + '&ts=' + timeStamp + '&apikey=' + pubKey + '&hash=' + hash;
	// console.log(apiUrl);
	// res.json(team);
	request(apiUrl, function(err, response, body){
		// console.log(typeof(body));
		var results = JSON.parse(body);
		// console.log(typeof(results));
		// console.log(results.data.results[0].name);

		var charImage = results.data.results[0].thumbnail.path + '.' + results.data.results[0].thumbnail.extension;
		// console.log(charImage);

		//creates new character model from CharacterSchema
		var character = new db.Character({
			name : results.data.results[0].name,
			description : results.data.results[0].description,
			image : charImage
		});

		character.save(function(err, char){
			if (err) {
				console.log(err);
			} else {
				console.log('New character ' + char.name + ' saved to database');
			}

		});

	});
}

module.exports.searchMarvel = searchMarvel;


