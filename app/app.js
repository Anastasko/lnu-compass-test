// require('./test/cityItem').run();
// require('./test/map').run();
// require('./test/mapItem').run();

const Api = require('./api');
const cityItemService = Api('/cityItem');
const cityItems = require('./data/cityItem');
const _ = require('underscore');


var f = function create(index) {
    console.log(index);
    let item = _.omit(cityItems[index], 'id');
    cityItemService.create(item).then(() => {
        if (index + 1 < cityItems.length) {
            f(index + 1);
        }
    });
}

f(0);




