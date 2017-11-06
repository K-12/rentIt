'use strict';
var mongoose = require('mongoose'),
bcrypt = require('bcrypt');
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
    hash_password: {
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
    created: {
        type: Date,
        default: Date.now()
    }
});

UserModel.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('Users', UserModel);