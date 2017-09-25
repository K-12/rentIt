'use strict';
module.exports = function(app) {
    var ad = require('../controllers/adController');

    // Ad routes
    app.route('/Ads')
        .get(ad.list_all_ads)
        .post(ad.create_ad);


    app.route('/Ads/:adId')
        .get(ad.get_ad)
        .put(ad.update_ad)
        .delete(ad.delete_ad);
};