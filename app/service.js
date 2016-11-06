var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
var expect = chai.expect,
    _ = require('underscore'),
    Api = require('./api'),
    config = require('./config');
    rootApi = require('./api')('');

var service = function(url) {

    let api = Api(url);

    let having = {
        item: {},
        created: function(item) {
            if (config.debug) {
                console.log('having created ' + JSON.stringify(item) +
                    ' ? ');
            }
            return having.item[item.id] ?
                new Promise(function(resolve, reject) {
                    let item1 = having.item[item.id];
                    if (config.debug) {
                        console.log('exit having created ' + JSON.stringify(item1) + ' with "from cache"');
                    }
                    resolve(item1);
                }) :
                api.create(item)
                .then(api.findOne)
                .then(function(i) {
                    item['id'] = i.id;
                    expect(i).to.shallowDeepEqual(item);
                    having.item[i.id] = item;
                    if (config.debug) {
                        console.log('exit having created ' + JSON.stringify(item) +
                            ' ?, with "no, created" ');
                    }
                    return i;
                });
        }
    };

    return {

        having: having,

        run: function(example) {

            it('create()', function() {
                return having.created(example.item);
            });

            it('findAll()', function() {
                return api.findAll().then(function(items) {
                    expect(items.length).to.equal(1);
                    expect(items).to.shallowDeepEqual([example.item]);
                });
            });

            it('update()', function() {
                return having.created(example.item)
                    .then(function(item) {
                        expect(item).to.exist;
                        let merged = _.extend(item, example.itemUpd);
                        return api.update(merged);
                    })
                    .then(api.findOne)
                    .then(function(item) {
                        expect(item).to.exist;
                        expect(item).to.shallowDeepEqual(example.itemUpd);
                    });
            });

            it('delete()', function() {
                return having.created(example.item)
                    .then(item => item.id)
                    .then(api.delete)
                    .then(function(id) {
                        return api.findOne(id, 404);
                    });
            });

        }
    }
};

module.exports = service;
