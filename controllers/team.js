//dependencies
const express = require('express');
const app = express();
const crypto = require('crypto');
const request = require('request');

//requires api keys
const priKey = process.env.priKey || require('../env.js').priKey;
const pubKey = process.env.pubKey || require('../env.js').pubKey;
const gKey = process.env.gKey || require('../env.js').gKey;
const cse = process.env.cse || require('../env.js').cse;

//requires model schemas
let db = require('../models');

function searchMarvel (req, res){
	// console.log(req.query.searchName);
	// console.log('priKey is ', priKey);
	// console.log('pubKey is ', pubKey);

//****************************
// setting the api key/url
//****************************

	//hashing api keys and time stamp
	var timeStamp = Date.now();
	// console.log(timeStamp);
	var string = timeStamp + (priKey + pubKey);
	var hash = crypto.createHash('md5').update(string).digest('hex');
	// console.log(hash);

	//api url
	var apiUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=' + req.query.searchName + '&ts=' + timeStamp + '&apikey=' + pubKey + '&hash=' + hash;
	// console.log(apiUrl);

//****************************************
// Marvel api request
//****************************************

	
	// res.json(team);
	request(apiUrl, function(err, APIresponse, body){
		if (err) {
			console.log("Error: " + err);
		}

		var result = JSON.parse(body);
		// console.log(typeof(results));
		// console.log(results.data.results[0].name);

// saves image url as charImage
		var charImage = result.data.results[0].thumbnail.path + '.' + result.data.results[0].thumbnail.extension;
		// console.log(charImage);
		
// preventing duplicates in database	
			var database = request('/team', function(err, response, info){
				db.Character.findOne({name : result.data.results[0].name}, function(err, character){
					if (err) {
						console.log('Error: ' + err);
					}
					if (!character) {
					// console.log('the results are: ' + character);
				//nest the character creation/saving function in here to do all this once the check has been made
					//creates new character model from CharacterSchema
			var newCharacter = new db.Character({
				name : result.data.results[0].name,
				description : result.data.results[0].description,
				image : charImage
				// site : 
			});

				newCharacter.save(function(err, char){
					if (err) {
						console.log(err);
					} else {
						console.log('New character ' + char.name + ' saved to database');
					}

					res.redirect('/searchDB');

					});
				} else { 
					// req.flash('duplicateMessage', 'Character is already on your team');
					res.redirect('/searchDB');
					//flash message - {message : req.flash('duplicateMessage')},
					//this isn't working error: express deprecated res.redirect(url, status): Use res.redirect(status, url) instead controllers/team.js:84:10
//events.js:183
     // throw er; // Unhandled 'error' event
     // ^

//RangeError: Invalid status code: /teamPage
				}

			});
		});
	});
}



module.exports.searchMarvel = searchMarvel;

//saves character's marvel page url **** not working
		// console.log(result.data.results[1]);
		// var charSite = result.data.results[1] + '&ts=' + timeStamp + '&apikey=' + pubKey + '&hash=' + hash;
		// console.log('character website: ', charSite);



