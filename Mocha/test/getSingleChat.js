var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var chai = require('chai');
chai.use(require('chai-json'));

var http = require('http');
chai.use(chaiHttp);

describe('Test get single chat result', function () {
//	this.timeout(15000);

	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:8080")
			.get("/chats/1")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return 1 chat object', function (){
		expect(response).to.have.status(200);
        expect(response).to.be.an('object');
        expect(response.body).to.be.a.jsonObj();
		expect(response).to.have.headers; 
    });
    
	it('Chat should contain known named properties and key', function(){
	    expect(requestResult).to.include.keys('chatId');
	    expect(requestResult).to.have.property('_id');
		expect(response.body).to.have.property('users');
	});

	it('Attributes in the chat should have known types', function(){
        expect(response.body).to.have.property('chatId').that.is.a('Number');
        expect(response.body).to.have.property('users').to.satisfy(
           function(body) {
               for (var i = 0; i < body.length; i++) {
                   expect(body[i]).that.is.a('Number');
               }
               return true;
            }
        );

	});	
	
});