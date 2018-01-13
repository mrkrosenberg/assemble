const passport = require('passport');

//GET /signup
function getSignUp(req, res){
	res.render('signup');
}

//POST /signup
function postSignUp(req, res, next){
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect : '/',
		failureRedirect : '/signup',
		failureFlash : true
	});
	return signupStrategy(req, res, next);
}

//*************************

//GET /login
function getLogin(request, response, next) {
	response.render('login.ejs', {message : request.flash('loginMessage')}); 
}

//POST /login
function postLogin(request, response, next) {
	var loginStrategy = passport.authenticate('local-login', {
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash : true
	});

	return loginStrategy(request, response, next);
}

//*************************

//GET /logout

//*************************

//Restricted page

//Exports
module.exports = {
	getSignUp : getSignUp,
	postSignUp : postSignUp
	//logout : logout,
};