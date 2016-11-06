var config = require('../config')

var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    assert = require('assert'),
    api = supertest(config.host)


describe('Map', function() {

    it('get all', function(done) {
        api.get('/map')
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.length).to.equal(0);
                done();
            });
    });

    it('create', function(done) {
        new Promise(function(resolve, reject) {
            api.get('/cityItem')
                .expect(200)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    id = res.body[0].id;
                    resolve(id);
                });
        }).then(function(id) {
            cityItemId = id;
            api.post('/map/create')
                .send({
                    floor: 5,
                    cityItem: {
                      id: id
                    }
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    assert.ok(!isNaN(res.body), JSON.stringify(res.body) + ' not a number ');
                    done();
                });
        });

    });

    it('create check', function(done) {
        api.get('/map')
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.length).to.equal(1);
                expect(res.body[0].floor).to.equal(5);
                expect(res.body[0].cityItem.id).to.equal(cityItemId);
                done();
            });
    });

});
