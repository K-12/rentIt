'use strict';
var mongoose = require('mongoose');
var Model = mongoose.Schema;

var UserModel = new Model({
    ID:{
        type: String,
        required: 'Enter user ID'
    },
    name: {
        type: String,
        required: 'Enter user name'
    },
    description: {
        type: String
    },
    number: {
        type: String,
        required: 'Enter user phone number'
    },
    location:{
        type: String,
        enum: ['Vilnius', 'Kaunas', 'Klaipeda', 'Kitas'],
        default: ['Kitas']
    },
    registered_date: {
        type: date,
        default: date.now()
    }

});


module.exports = mongoose.model('Users', UserModel);