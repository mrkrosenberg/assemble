//dependencies
const express = require('express');
const crypto = require('crypto');
const request = require('request');

//express' router function
const router = express.Router();

//requires api keys
const key = require('../env.js').key;
const pubKey = require('../env.js').pubKey;






var team = {
	name : 'superheroes',
	number : 10
};
//Index
router.get('/api', function searchMarvel (req, res){
	console.log(req.body);
	// console.log('key is ', key);
	// console.log('pubKey is ', pubKey);

	//hashing api keys and time stamp
	var timeStamp = Date.now();
	console.log(timeStamp);
	var string = timeStamp + key;

	var hash = crypto.createHash('md5').update(string).digest('hex');
	console.log(hash);

	//api url
	var apiUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=Thor&ts=' + timeStamp + '&apikey=' + pubKey + '&hash=' + hash;
	console.log(apiUrl);
	res.json(team);
	request(apiUrl, function(err, res, body){
		// console.log(body);
	});
});


//exports
module.exports = router;



