let Test = require('../test');

class CityItemTest extends Test {

    constructor() {
        super({
            url: '/cityItem'
        })
    }

    getExample() {
        return {
            name: 'test name',
            longitude: 123,
            latitude: 777
        }
    }

    getExampleUpd() {
        return {
            name: 'name 2',
            longitude: 789,
            latitude: 1128
        }
    }

}

module.exports = CityItemTest;
