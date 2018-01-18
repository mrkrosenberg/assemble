//dependencies
const express = require('express');
const methodOverride = require('method-override');
const ejs = require('ejs');


//express' router function
const router = express.Router();

//starts express application
const app = express();

//import controller functions
const teamController = require('../controllers/team');
const usersController = require('../controllers/user');

//requires database connection
const db = require('../models');

//body parsers
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//sets main endpoint to display index.html
router.route('/', function homepage (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

//GET request route for Marvel API
router.route('/search')
	.get(teamController.searchMarvel);

//Page Flow
router.get('/teamPage', function teamPage(req, res, next){
	res.render('teamPage');
});

//user authentication function
router.route('/signup')
	.get(usersController.getSignUp)
	.post(usersController.postSignUp);

router.route('/login')
	.get(usersController.getLogin)
	.post(usersController.postLogin);

router.route('/logout')
	.get(usersController.getLogout)
	.post(usersController.getLogout);

//Route for ajax call to database (get team member info from database to populate "cards")
//.get(teamController.)

//Character RESTful routes (Index, Show, Post, Put, Delete)
router.get('/searchDB', function indexAll(req, res){
	db.Character.find({}, function(err, characters){
		if (err) {
			console.log('Error: ' + err);
		}
		res.render('teamPage', {characters});
	});
});

router.get('/searchDB/:id', function showCharacter(req, res){
	db.Character.findOne({_id : req.params.id}, function(err, character){
		if (err) {
			console.log('Error: ' + err);
		}
		res.json(character);
	});
});

router.post('/searchDB', function createCharacter(req, res){
	var newCharacter = new db.Character ({
		name : req.body.name,
		description : req.body.description,
		image : req.body.image,
		site : req.body.site
	});
	db.Character.create(newCharacter, function(err, character){
		if (err){
			return console.log('Error: ' + err);
		} 
		console.log('Saved ' + character + ' to database');
		res.json(character);
	});
});

router.put('/searchDB/:id', function updateCharacter(req, res){
	// var updatedChar = req.params.id;
	db.Character.findOneAndUpdate({_id: req.params.id}, {$set: {name : req.body.name, description : req.body.description}}, 
		function(err, character){
			if (err) {
				return console.log(err);
			}
			res.json(character);
		});
});

router.delete('/searchDB/:id', function deleteCharacter(req, res){
	db.Character.findOneAndRemove({_id : req.params.id}, function(err, character){
		res.json(character + 'deleted');
	});
});



//exports
module.exports = router;



