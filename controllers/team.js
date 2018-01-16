//dependencies
const express = require('express');
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

	var newCharacter;

	//hashing api keys and time stamp
	var timeStamp = Date.now();
	// console.log(timeStamp);
	var string = timeStamp + key;
	var hash = crypto.createHash('md5').update(string).digest('hex');
	// console.log(hash);

	//api url
	var apiUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=' + req.query.searchName + '&ts=' + timeStamp + '&apikey=' + pubKey + '&hash=' + hash;
	// console.log(apiUrl);

//****************************************
// character background image api request
//****************************************

	
	// res.json(team);
	request(apiUrl, function(err, response, body){
		// console.log(typeof(body));
		var result = JSON.parse(body);
		// console.log(typeof(results));
		// console.log(results.data.results[0].name);

//**************************************
// character website link - not working
//**************************************
		// var charImage = result.data.results[0].thumbnail.path + '.' + result.data.results[0].thumbnail.extension;
		// console.log(charImage);
		// console.log(result.data.results[1]);
		// var charSite = result.data.results[1] + '&ts=' + timeStamp + '&apikey=' + pubKey + '&hash=' + hash;
		// console.log('character website: ', charSite);


		//creates new character model from CharacterSchema
		var character = new db.Character({
			name : result.data.results[0].name,
			description : result.data.results[0].description
			// image : ,
			// site : 
		});

		newCharacter = character;

		character.save(function(err, char){
			if (err) {
				console.log(err);
			} else {
				console.log('New character ' + char.name + ' saved to database');
			}
		});
	});

//Functionality for adding new team members to the member page
	// res.render('../views/teamPage.ejs');

}


module.exports.searchMarvel = searchMarvel;


