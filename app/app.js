var config = require('./config')

var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    assert = require('assert'),
    api = supertest(config.host)

it('reset', function (done) {
    api.post('/reset').expect(200, done);
});

require('./test/cityItem')
require('./test/map')
