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


//exports
module.exports = router;



