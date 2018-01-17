const db = require('../models');
const expect = require('chai').expect;
const request = require('request');

let url = 'https://rocky-citadel-18780.herokuapp.com/';

describe('Testing Server', function(){
	it('should respond with status 200/ok', function(done){
		request(url, function(err, res, body){
			expect(res.statusCode).to.eq(200);
			done();
		});
	});
});