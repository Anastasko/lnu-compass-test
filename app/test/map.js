var genericService = require('../service');

var url = '/map';
let service = genericService(url);
let cityItemService = genericService('/cityItem')
var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
var expect = chai.expect;

module.exports = {

    run: function() {

        describe(url, function() {

            let example = {};

            before(function(done) {
                Promise.all(
                        [
                            cityItemService.having.created({}),
                            cityItemService.having.created({}),
                        ]
                    )
                    .then(function(owners) {

                        owner1 = owners[0];
                        owner2 = owners[1];

                        example.item = {
                            floor: 7,
                            cityItem: {
                                id: owner1.id
                            }
                        };

                        example.itemUpd = {
                            floor: 8,
                            cityItem: {
                                id: owner2.id
                            }
                        }
                        done();
                    })
            });

            service.run(example);

        });

    },

    service: service
};
