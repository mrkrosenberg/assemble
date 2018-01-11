//dependencies
const express = require('express');
const crypto = require('crypto');
const request = require('request');

//express' router function
const router = express.Router();

//starts express application
const app = express();

//requires model schemas
let db = require('../models');

//body parsers
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//requires api keys
const key = require('../env.js').key;
const pubKey = require('../env.js').pubKey;


//Index
router.get('/api', function searchMarvel (req, res){
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
		console.log(results.data.results[0].name);
	});
});


//exports
module.exports = router;



