var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

//chai.use(require('chai-datetime'));
chai.use(require('chai-json'));

var http = require('http');
chai.use(chaiHttp);

describe('Test get array of messages result', function () {
//	this.timeout(15000);

	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:8080")
			.get("/chats/1/messages")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return array of messages that belong to chat', function (){
		expect(response).to.have.status(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length.above(1);
        expect(response.body).to.be.a.jsonObj();
		expect(response).to.have.headers;
    });
    
	it('The first entry in the array has known properties', function(){
	    expect(requestResult[0]).to.include.keys('messageId');
	    expect(requestResult[0]).to.have.property('_id');
		expect(response.body[0]).to.have.property('delivered');
        expect(response.body[0]).to.have.property('originalText');
        expect(response.body[0]).to.have.property('translatedText');
        expect(response.body[0]).to.have.property('userId');
        expect(response.body[0]).to.have.property('friendId');
        expect(response.body[0]).to.have.property('dateCreated');
        expect(response.body[0]).to.have.property('languageTo');
        expect(response.body[0]).to.have.property('languageFrom');
        expect(response.body[0]).to.have.property('chatId');
	});

	it('Elements in messages array should have known types', function(){
        expect(response.body).to.satisfy(
           function(body) {
               for (var i = 0; i < body.length; i++) {
                   expect(body[i]).to.have.property('delivered').that.is.a('Boolean');
                   expect(body[i]).to.have.property('originalText').that.is.a('string');
                   expect(body[i]).to.have.property('translatedText').that.is.a('string');
                   expect(body[i]).to.have.property('userId').that.is.a('Number');
                   expect(body[i]).to.have.property('friendId').that.is.a('Number');
                   expect(body[i]).to.have.property('languageTo').that.is.a('String');
                   expect(body[i]).to.have.property('languageFrom').that.is.a('String');
                   expect(body[i]).to.have.property('messageId').that.is.a('Number');
                   expect(body[i]).to.have.property('chatId').that.is.a('Number');
               }
               return true;
            }
        );

	});	
	
});