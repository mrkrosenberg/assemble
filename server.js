//requiring dependencies
const express 	= require('express');
const app 		= express();
const passport  = require('passport');
const flash     = require('connect-flash');
const morgan    = require('morgan');
const session   = require('express-session');


//body parsers
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//establishes our views and view engine **when render() is called, this is the engine used
app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

//sets up a user session to store data and cookies
app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

//uses public folder to display static files
app.use(express.static(__dirname + '/public'));




/**************
//Routes
/**************/

var routes = require('./config/routes.js');
app.use(routes);


// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

