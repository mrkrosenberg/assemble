const db = require('../../models');
const mongoose = require('mongoose');

//waits for the page to load before running any javascript
$(document).ready(function(){
	console.log('hello world');
	
	//listener on teamMember form submit button
	$('.teamMember').on('submit', function(){
		//show modal
			//modal will alert: 'new team member added' || 'add hero to your team?'
		//button on modal will close modal and dynamically populate carousel from database of characters
	});

let team = db.find({});
			console.log(team);
		team.forEach(function (member){
			//create a carousel element for each object 
			//append each new element to the carousel on teamPage
		});


});