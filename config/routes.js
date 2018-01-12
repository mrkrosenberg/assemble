//dependencies
const express = require('express');
var methodOverride = require('method-override');

//express' router function
const router = express.Router();

//starts express application
const app = express();

//import controller functions
const teamController = require('../controllers/team');



//body parsers
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//sets main endpoint to display index.html
// router.route('/', function homepage (req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });

//GET request route for Marvel API
router.route('/search')
	.get(teamController.searchMarvel);

//Routes for Users


//exports
module.exports = router;



