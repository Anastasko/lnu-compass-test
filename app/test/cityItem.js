var genericService = require('../service');

var url = '/cityItem';
let service = genericService(url);

module.exports = {

    run: function() {

        describe(url, function() {

            var example = {

                item: {
                    name: 'test name',
                    longitude: 123,
                    latitude: 777
                },

                itemUpd: {
                    name: 'name 2',
                    longitude: 789,
                    latitude: 1128
                }

            };

            service.run(example);

        })
    },

    service: service
};
