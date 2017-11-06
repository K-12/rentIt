'use strict';
module.exports = function(app) {
    var ad = require('../controllers/adController'),
    userHandlers = require('../controllers/userController');

    // Ad routes
    app.route('/Ads')
        .get(userHandlers.loginRequired, ad.list_all_ads)
        .post(userHandlers.loginRequired, ad.create_ad);


    app.route('/Ads/:adId')
        .get(ad.get_ad)
        .put(ad.update_ad)
        .delete(ad.delete_ad);
    
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
};