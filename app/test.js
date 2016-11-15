var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
var expect = chai.expect,
    _ = require('underscore'),
    Api = require('./api'),
    rootApi = require('./api')('');

class Test {

    constructor(options) {
        this.url = options.url;
        this.api = new Api(options.url);
    }

    before(done) {
        done()
    }

    getInstance() {
        return this.api.create({})
            .then(function(id) {
                return {
                    id: id
                }
            });
    }

    run() {
        let that = this;

        describe(this.url, function() {

            beforeEach(function(done) {
                that.before(done);
            });

            afterEach(function(done) {
                rootApi.post('/reset')
                    .then(function() {
                        done()
                    })
            })

            it('create()', function() {
                return that.api.create(that.getExample())
                    .then(that.api.findOne)
                    .then(function(i) {
                        expect(i).to.shallowDeepEqual(that.getExample());
                    })
            })

            it('findAll()', function() {
                return that.api.create(that.getExample())
                    .then(that.api.findAll)
                    .then(function(items) {
                        expect(items.length).to.equal(1);
                        expect(items).to.shallowDeepEqual([that.getExample()]);
                    })
            })

            it('update()', function() {
                return that.api.create(that.getExample())
                    .then(that.api.findOne)
                    .then(function(item) {
                        expect(item).to.exist;
                        let merged = _.extend(item, that.getExampleUpd());
                        return that.api.update(merged);
                    })
                    .then(that.api.findOne)
                    .then(function(item) {
                        expect(item).to.exist;
                        expect(item).to.shallowDeepEqual(that.getExampleUpd());
                    })
            })

            it('delete()', function() {
                return that.api.create(that.getExample())
                    .then(that.api.delete)
                    .then(function(id) {
                        return that.api.findOne(id, 404);
                    })
            })

        })
    }
}

module.exports = Test;
