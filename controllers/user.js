const passport = require('passport');

//GET /signup
function getSignUp(req, res, next){
	res.render('signup', { message: req.flash('signupMessage') });
}

//POST /signup
function postSignUp(req, res, next){
	let signupStrategy = passport.authenticate('local-signup', {
		successRedirect : '/teamPage',
		failureRedirect : '/signup',
		failureFlash : true
	});
	return signupStrategy(req, res, next);
}

//*************************

//GET /login
function getLogin(req, res, next) {
	res.render('login', {message : req.flash('loginMessage')}); 
}

//POST /login
function postLogin(req, res, next) {
	var loginStrategy = passport.authenticate('local-login', {
		successRedirect : '/teamPage',
		failureRedirect : '/login',
		failureFlash : true
	});

	return loginStrategy(req, res, next);
}

//*************************

//GET /logout
function getLogout(req, res) {
	req.logout();
	res.redirect('/');
}

//*************************

//Restricted page

//Exports
module.exports = {
	getSignUp : getSignUp,
	postSignUp : postSignUp,
	getLogin : getLogin,
	postLogin : postLogin,
	getLogout : getLogout
};

