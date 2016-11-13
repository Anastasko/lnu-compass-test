var should = require('chai').should(),
    expect = require('chai').expect,
    config = require('./config'),
    api = require('supertest')(config.host),
    assert = require('assert');

var getException = function(text){
  let ind1 = text.indexOf('<h1>');
  let ind2 = text.indexOf('</h1>');
  return (ind1 > 0 && ind2 > 0 && text.substring(ind1+4, ind2)) || text || '';
}

var Api = function(prefix) {

    return {

        findAll: function() {
            return new Promise(function(resolve, reject) {
                api.get(prefix)
                    .end(function(err, res) {
                      assert.equal(res.statusCode, 200, res.statusCode + ' != 200. '+ getException(res.text));
                      resolve(res.body);
                    });
            });
        },

        findOne: function(id, statusCode = 200) {
            return new Promise(function(resolve, reject) {
                api.get(prefix + '/' + id)
                    .end(function(err, res) {
                        assert.equal(res.statusCode, statusCode, res.statusCode + ' != ' + statusCode + '. '+ getException(res.text));
                        resolve(res.body);
                    });
            });
        },

        create: function(item) {
            if (config.debug){
              console.log(' - api: creating ' + JSON.stringify(item));
            }
            return new Promise(function(resolve, reject) {
                api.post(prefix)
                    .send(item)
                    .end(function(err, res) {
                        assert.equal(res.statusCode, 200, res.statusCode + ' != 200. '+ getException(res.text));
                        assert.ok(!isNaN(res.body), 'id not a number');
                        if (config.debug){
                          console.log(' - api: created ' +
                          JSON.stringify(item) +
                          ' with id: ' + res.body);
                        }
                        resolve(res.body);
                    });
            });
        },

        update: function(item) {
            return new Promise(function(resolve, reject) {
                api.put(prefix)
                    .send(item)
                    .end(function(err, res) {
                        assert.equal(res.statusCode, 200, res.statusCode + ' != 200. '+ getException(res.text));
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
                        assert.equal(res.statusCode, 200, res.statusCode + ' != 200. '+ getException(res.text));
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
