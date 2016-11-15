let Test = require('../test');
let cityItem = require('./cityItem');
let map = require('./map');

class MapItemTest extends Test {

    constructor() {
        super({
            url: '/mapItem'
        })
    }

    before(done) {
        let that = this;
        return Promise.all([
            map.getInstance(),
            map.getInstance()
        ]).then(function(results) {
            that.map1 = results[0];
            that.map2 = results[1];
            done()
        })
    }

    getExample() {
        return {
            map: this.map1,
            path: 1,
            name: '118-A'
        }
    }

    getExampleUpd() {
        return {
            map: this.map2,
            path: 2,
            name: '270'
        }
    }

}

module.exports = new MapItemTest();
