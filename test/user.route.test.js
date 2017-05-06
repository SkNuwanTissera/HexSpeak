const mongoose = require('mongoose');
should = require('should');
request = require('supertest');

//importing to testing the app
const app = require("./../server");



//start testing
describe('User route Test', function () {

    let agent;

    before(function () {
        // agent = request.agent(app);
    });

    var user =
            {
                firstName: "nuwan",
                lastName: "tissera"
            }
        ;

//Code goes here
    //behaviour driven pattern
    it('should adda a user', done => {
        agent.post('/users')
            .send(user)
            .expect(201)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                res.body.should.be.an.Object()
                    .and.have.property('_id');
                done();
            });
    });
});