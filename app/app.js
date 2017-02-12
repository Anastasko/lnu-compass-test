// require('./test/cityItem').run();
// require('./test/map').run();
// require('./test/mapItem').run();

const Api = require('./api');
const _ = require('underscore');
const iosIcons = require('./data/iosIcons');
const androidIcons = require('./data/androidIcons');
const iconsMap = require('./data/iconsMap');
const cityItems = require('./data/cityItem');

var f = function create(api, data, index, keyMap, resolve) {
    console.log(keyMap[index]);
    let item = data[keyMap[index]];
    api.create(item).then((id) => {
        item.id = id;
        if (index + 1 < keyMap.length) {
            f(api, data, index + 1, keyMap, resolve);
        } else {
            resolve();
        }
    });
}

var syncAPI = function(api, data){
    console.log("       API: " + api.getPrefix());
    return new Promise(function(resolve, reject){
        let keyMap = [];
        _.each(data, (i,k) => {
            keyMap.push(k);
        });
        f(api, data, 0, keyMap, resolve);
    });
}

var android = {};
_.each(androidIcons, (icon, key) => {
    let ico = {};
    _.each(icon, (v,k) => {
        ico[k] = {
            url: v
        }
    })
    android[key] = ico;
});

var ios = {};
_.each(iosIcons, (icon, key) => {
    let ok = {
        size2x: {
            url: icon["@2x"]
        },        size3x: {
            url: icon["@3x"]
        }
    }
    ios[key] = ok;
});

var kinds = {};
var items = [];

Promise.resolve().then(() => {
    return syncAPI(Api('/iosIcon'), ios)
}).then(() => {
    return syncAPI(Api('/androidIcon'), android);
}).then(() => {
    _.each(iconsMap, (v,k) => {
        let kind = {
            name: k.toLowerCase(),
            iosIcon: {
                id: ios[v].id
            },
            androidIcon: {
                id: android[v].id
            }
        }
        kinds[k] = kind;
    });
}).then(() => {
    return syncAPI(Api('/itemKind'), kinds);
}).then(() => {
    _.each(cityItems, (v,k) => {
        let item = v;
        v.kind = {
            id: kinds[v.kind].id
        };
        v.owner = {
            id: 1
        }
        items.push(item);
    });
}).then(() => {
    return syncAPI(Api('/cityItem'), items);
}).then(() => {
    console.log("OK");
}).catch((e) => {
    console.error(e);
})


