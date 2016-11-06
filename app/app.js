var api = require('./api')('')

it('reset', function (done) {
    api.post('/reset').expect(200, done);
});

require('./test/cityItem')
//require('./test/map')
