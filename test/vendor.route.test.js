const mocha = require('mocha');
const should = require('should');
const request = require('supertest');

//Importing server to test the app
const app = require('../server.js');

const agent = request.agent(app);

const noOfCurrentVendors = 4;

describe('Vendor route Test', function () {
    //Creating a sample vendor obj
    const vendor = {'firstName':'Tharindu','lastName':'Perera','sellingDrugs':['Drug1','Drug2'],'address':'Colombo3','tp':'0777112233','email':'dev@gmail.com','company':'ABCpvtLtd'};

    //Adding an unit test for saving the new vendor by calling the route
    it('should add new vendor', (done) => {
        agent.post('/vendors')
            .send(vendor)
            .expect(201)
            .end(function (err, res) {
                vendorId = res.body._id;
                res.body.should.be.an.Object().and.have.property('_id');
                done();
            });
    });

    //Adding an unit test for fetching all the vendors
    it('should get a list of vendors', (done) => {
        agent.get('/vendors')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return reject(err);
                }
                res.body.should.be.an.Array().and.have.length(noOfCurrentVendors+1);
                done();
            });
    });

    //Adding an unit test to fetch one vendor by ID
    it('should get a vendor by ID', (done) => {
        agent.get('/vendors/'.concat(vendorId))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return reject(err);
                }
                res.body.should.have.property('_id').equal(vendorId);
                done();
            });
    });

    //Adding a unit test to update a vendor by ID
    it('should update a vendor by ID', (done) => {
        const newVendor = Object.assign({}, vendor);
        newVendor.firstName = 'Jack';
        agent.put('/vendors/'.concat(vendorId))
            .send(newVendor)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return reject(err);
                }
                res.body.should.have.property('firstName').equal(newVendor.firstName);
                done();
            });
    });

    //Adding a unit test to delete a vendor by ID (use the previously created vendor)
    it('should delete a driver by ID', (done) => {
        agent.delete('/vendors/'.concat(vendorId))
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return reject(err);
                }
                done();
            });
    });

});
