var should = require('chai').should(),
    expect = require('chai').expect,
    config = require('./config'),
    api = require('supertest')(config.host),
    assert = require('assert');

var getException = function(res, data) {
    let ind1 = res.text.indexOf('<h1>');
    let ind2 = res.text.indexOf('</h1>');
    let result = (ind1 > 0 && ind2 > 0 && res.text.substring(ind1 + 4, ind2)) || res.text || '';
    if (res.text && data) {
        result += '\n' + data;
    }
    return result;
}

var Api = function(prefix) {

    return {

        findAll: function() {
            return new Promise(function(resolve, reject) {
                api.get(prefix)
                    .end(function(err, res) {
                        assert.equal(res.statusCode, 200, res.statusCode + ' != 200. ' +
                            getException(res, prefix));
                        resolve(res.body);
                    });
            });
        },

        findOne: function(id, statusCode = 200) {
            return new Promise(function(resolve, reject) {
                api.get(prefix + '/' + id)
                    .end(function(err, res) {
                        assert.equal(res.statusCode, statusCode, res.statusCode + ' != ' + statusCode + '. ' +
                            getException(res, `${prefix}/${id}`));
                        resolve(res.body);
                    });
            });
        },

        create: function(item) {
            return new Promise(function(resolve, reject) {
                api.post(prefix)
                    .send(item)
                    .end(function(err, res) {
                        assert.equal(res.statusCode, 200, res.statusCode + ' != 200. ' + getException(res, prefix + '/create ' + `${JSON.stringify(item)}`));
                        assert.ok(res.body && !isNaN(res.body), 'id not a number');
                        resolve(res.body);
                    });
            });
        },

        update: function(item) {
            return new Promise(function(resolve, reject) {
                api.put(prefix)
                    .send(item)
                    .end(function(err, res) {
                        assert.equal(res.statusCode, 200, res.statusCode + ' != 200. ' +
                            getException(res, prefix + '/update ' + `${JSON.stringify(item)}`));
                        assert.ok(!isNaN(res.body), 'id not a number');
                        resolve(item.id);
                    });
            });
        },

        delete: function(id) {
            expect(id).to.exist;
            expect(id).to.be.a('number');
            return new Promise(function(resolve, reject) {
                api.delete(prefix + `/${id}`)
                    .end(function(err, res) {
                        assert.equal(res.statusCode, 200, res.statusCode + ' != 200. ' +
                            getException(res, prefix + `/delete/${id}`));
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
