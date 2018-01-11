//requiring dependencies
const express = require('express');
const app = express();


//body parsers
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//establishes our views and view engine **when render() is called, this is the engine used
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

//uses public folder to display static files
app.use(express.static(__dirname + '/public'));




/**************
//Routes
/**************/


//sets main endpoint to display index.html
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//requires route endpoints from routes.js
var routes = require('./config/routes.js');
app.use(routes);


// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

