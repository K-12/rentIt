'use strict';


var mongoose = require('mongoose'),
    Ad = mongoose.model('Ads');

exports.list_all_ads = function(req, res) {
    Ad.find({}, function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};




exports.create_ad = function(req, res) {
    var new_ad = new Ad(req.body);
    new_ad.save(function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.get_ad = function(req, res) {
    Ad.findById(req.params.adId, function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.update_ad = function(req, res) {
    Ad.findOneAndUpdate({_id: req.params.adId}, req.body, {new: true}, function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.delete_ad = function(req, res) {


    Ad.remove({
        _id: req.params.adId
    }, function(err, object) {
        if (err)
            res.send(err);
        res.json({ message: 'Ad successfully deleted' });
    });
};