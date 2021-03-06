//requiring dependencies
const express 	= require('express');
const app 		= express();
const passport  = require('passport');
const flash     = require('connect-flash');
const morgan    = require('morgan');
const session   = require('express-session');
const dotenv = require('dotenv').config();

//db connection
var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost:27017/proj2");

//body parsers
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//establishes our views and view engine **when render() is called, this is the engine used
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

//sets up a user session to store data and cookies
app.use(session({ secret: 'Avengers Assemble!' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

//uses public folder to display static files
app.use(express.static(__dirname + '/public'));

//sets the strategies
require('./config/passport')(passport);

//makes the req.user object available everywhere
app.use(function(req, res, next){					//always include next in the parameters in order to use it,
	res.locals.currentUser = req.user;  //defines currentUser here as a property of res.locals
	next();
});

/**************
//Routes
/**************/

//requires all the routing endpoints
var routes = require('./config/routes.js');
app.use('/', routes);


// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

