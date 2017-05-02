const mongoose = require('mongoose');
should = require('should');
request = require('supertest');

//importing to testing the app
const app = require("./../server");



//start testing
describe('Driver route Test', function () {

    let agent;

    before(function () {
        // agent = request.agent(app);
    });

    var driver =
            {
                firstName: "nuwan",
                lastName: "tissera"
            }
        ;

//Code goes here
    //behavoiur driven pattern
    it('should adda a driver', done => {
        agent.post('/drivers')
            .send(driver)
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