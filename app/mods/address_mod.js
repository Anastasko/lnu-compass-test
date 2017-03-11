const Api = require('../api');
const service = Api('/cityItem');
const _ = require('underscore');
const addr = require("../data/address");

service.findAll().then((datas) => {
console.log(datas.length);

    _.each(datas, (data, i) => {

        setTimeout(() => {

        // let  lng = data.longitude;
        // let lat = data.latitude;
        // const geocoder = require('supertest')(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=uk`)
        // geocoder.get('').then(d => {
        //   try {
        //     console.log('m[' + data.id + '] = "' + d.body.results[0].formatted_address + '"');
        //   } catch (e) {
        //       console.log('--------' + data.id);
        //   }
        // });

            let u = data;
            u.address = addr[data.id]
            console.log(i);
            service.update(u);

        }, (i*500));

    });



});
