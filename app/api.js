var host = 'localhost:8080/lnucompass'

var should = require('chai').should(),
    expect = require('chai').expect,
    api = require('supertest')(host),
    assert = require('assert');

var Api = function(prefix) {

    return {

        findAll: function() {
            return new Promise(function(resolve, reject) {
                api.get(prefix)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        resolve(res.body);
                    });
            });
        },

        findOne: function(id, statusCode = 200) {
            return new Promise(function(resolve, reject) {
                api.get(prefix + '/' + id)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(statusCode);
                        resolve(res.body);
                    });
            });
        },

        create: function(item) {
            return new Promise(function(resolve, reject) {
                api.post(prefix + '/create')
                    .send(item)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        assert.ok(!isNaN(res.body), 'id not a number');
                        resolve(res.body);
                    });
            });
        },

        update: function(item) {
            return new Promise(function(resolve, reject) {
                api.post(prefix + '/update')
                    .send(item)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        assert.ok(!isNaN(res.body), 'id not a number');
                        resolve(item.id);
                    });
            });
        },

        delete: function(id) {
            return new Promise(function(resolve, reject) {
                api.post(prefix + `/delete/${id}`)
                    .end(function(err, res) {
                        expect(res.statusCode).to.equal(200);
                        resolve(id);
                    });
            });
        },

        post: function(url) {
            return api.post(prefix + url);
        },

        get: function(url) {
            return api.get(prefix + url)
        }
    }
};

module.exports = Api;
