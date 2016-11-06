var config = require('../config')

var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    assert = require('assert'),
    api = supertest(config.host)


describe('CityItem', function() {

    it('get all', function(done) {
        api.get('/cityItem')
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.length).to.equal(0);
                done();
            });
    });

    let some_id;

    it('create', function(done) {
        new Promise(function(resolve, reject) {
            api.post('/cityItem/create')
                .send({
                    name: 'test name',
                    longitude: 123,
                    latitude: 777
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    assert.ok(!isNaN(res.body), 'id not a number');
                    resolve(res.body);
                })
        }).then(function(id) {
            some_id = id;
            api.get(`/cityItem/${id}`)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.id).to.equal(id);
                    expect(res.body.name).to.equal('test name');
                    expect(res.body.longitude).to.equal(123);
                    expect(res.body.latitude).to.equal(777);
                    done();
                });
        });
    });

    it('get all', function(done) {
        api.get('/cityItem')
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.length).to.equal(1);
                done();
            });
    });

    it('update', function(done) {
        new Promise(function(resolve, reject) {
            api.post('/cityItem/update')
                .send({
                    id: some_id,
                    name: 'test name 2',
                    longitude: 1234,
                    latitude: 7778
                })
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    resolve();
                })
        }).then(function() {
          api.get(`/cityItem/${some_id}`)
              .end(function(err, res) {
                  expect(res.statusCode).to.equal(200);
                  expect(res.body.id).to.equal(some_id);
                  expect(res.body.name).to.equal('test name 2');
                  expect(res.body.longitude).to.equal(1234);
                  expect(res.body.latitude).to.equal(7778);
                  done();
              });
        });
    });

    it('delete', function(done) {
        new Promise(function(resolve, reject) {
            api.post(`/cityItem/delete/${some_id}`)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    resolve();
                })
        }).then(function() {
          api.get(`/cityItem/${some_id}`)
              .end(function(err, res) {
                  expect(res.statusCode).to.equal(404);
                  done();
              });
        });
    });



});
