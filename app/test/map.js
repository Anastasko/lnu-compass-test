let Test = require('../test');
let cityItem = require('./cityItem');

class MapTest extends Test {

    constructor() {
        super({
            url: '/map'
        })
    }

    getInstance() {
        let that = this;
        return cityItem.getInstance()
            .then(function(item) {
                return that.api.create({
                    cityItem: item
                });
            })
            .then(function(id){
              return {
                id: id
              }
            });
    }

    before(done) {
        let that = this;
        return Promise.all([
            cityItem.getInstance(),
            cityItem.getInstance()
        ]).then(function(results) {
            that.item1 = results[0];
            that.item2 = results[1];
            done()
        })
    }

    getExample() {
        return {
            floor: 4,
            cityItem: this.item1
        }
    }

    getExampleUpd() {
        return {
            floor: 7,
            cityItem: this.item2
        }
    }

}

module.exports = new MapTest();
