const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');


//function to export - handles all of the strategies for local login
module.exports = function(passport){

	//packing everything to send to the client
	passport.serializeUser( function(user, callback){
		callback(null, user.id);
	});

	//unpacking everything 
	passport.deserializeUser( function(id, callback){
		//searches the database for a specific user after data has been unpacked
		User.findById(id, function(err, user){
			callback(err, user);
		});
	});

	//signup strategy
	passport.use('local-signup', new LocalStrategy({  //constructor function for login functionality
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function(req, email, password, callback){  //callback is passport's done function
		// console.log(req);
		//functionality to check for existing account/new account creationg
		User.findOne({'email' : email}, function(err, user){
			// console.log('santiy check');
			if (err) return callback(err);

			if(user){
				// console.log('super sanity check');
				return callback(null, false, req.flash('signupMessage', 'This email is already in use'));
			} else {
				// console.log('new user created');
				//If no matching document exists, create one
				var newUser = new User();  //uses the model in models/user.js as a constructor
				newUser.email = email;  //newUser becomes User (with all its properties and values). User model has property local which has properties email and password
				newUser.password = newUser.encrypt(password);

				// console.log('encrypted');
				
				//saves new user to database
				newUser.save(function(err){
					console.log('saved to database');
					if (err) throw err;
					return callback(null, newUser);
				});
			}
		});
	}));

//Local login strategy
	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, function(req, email, password, callback){

		//search for a user with this email
		User.findOne({'email' : email}, function(err, user){
			if (err) return callback(err);

			//if no user is found
			if(!user) {
				return callback(null, false, req.flash('loginMessage', 'no user found'));
			}

			//Wrong password
			if (!user.validPassword(password)) {
				return callback(null, false, req.flash('loginMessage', 'wrong password'));
			}

			//if none of the other conditions are met, return the user object
			return callback(null, user);
		});

	}));
};

