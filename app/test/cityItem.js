var expect = require('chai').expect,
    assert = require('assert');

var url = '/cityItem';

describe(url, function() {

    var api = require('../api')(url);

    var having = {

        created: function() {
            return api.create({
                    name: 'test name',
                    longitude: 123,
                    latitude: 777
                })
                .then(api.findOne)
                .then(function(item) {
                    expect(item.name).to.equal('test name');
                    expect(item.longitude).to.equal(123);
                    expect(item.latitude).to.equal(777);
                    return item.id;
                });
        }

    };

    it('findAll()', function(done) {
        api.findAll().then(function(data) {
            expect(data.length).to.equal(0);
            done();
        });
    });

    it('create()', function(done) {
        having.created().then(function() {
            done();
        });
    });

    it('update()', function(done) {
        let ID;
        having.created()
            .then(function(id) {
                ID = id;
                return api.update({
                    id: id,
                    name: 'test name 2',
                    longitude: 1234,
                    latitude: 7778
                })
            })
            .then(api.findOne)
            .then(function(item) {
                expect(item.id).to.equal(ID);
                expect(item.name).to.equal('test name 2');
                expect(item.longitude).to.equal(1234);
                expect(item.latitude).to.equal(7778);
                done();
            });
    });

    it('delete', function(done) {
        having.created()
            .then(api.delete)
            .then(function(id) {
                api.findOne(id, 404);
                done();
            });

    });


});
