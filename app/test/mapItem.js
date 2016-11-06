var genericService = require('../service');

var url = '/map';
let service = genericService(url);
var chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));
var expect = chai.expect;

let cityItemService = genericService('/cityItem')
let mapService = genericService('/map')

module.exports = {

    run: function() {



    },

    service: service
};
