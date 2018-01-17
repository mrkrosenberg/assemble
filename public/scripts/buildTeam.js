console.log('hello');
//waits for the page to load before running any javascript
$(document).ready(function(){
	console.log('hello world');
	
	//listener on teamMember form submit button
	$('.teamMember').on('submit', function(){
		//show modal
			//modal will alert: 'new team member added' || 'add hero to your team?'
		//button on modal will close modal and dynamically populate carousel from database of characters
	});




});