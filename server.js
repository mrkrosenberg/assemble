//requiring dependencies
const express = require('express');
const app = express();
const request = require('request');

const crypto = require('crypto');

//body parsers
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//
var timeStamp = Date.now();
console.log(timeStamp);
var string = timeStamp + '0db0df8485cf3ee023e90e1f678a2a72d980c9b0' + '3e31c7147f9db0cad29608f49fb9488f';

var hash = crypto.createHash('md5').update(string).digest('hex');
console.log(hash);


// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

