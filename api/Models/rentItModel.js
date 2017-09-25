'use strict';
var mongoose = require('mongoose');
var Model = mongoose.Schema;


var AdModel = new Model({
  name: {
    type: String,
    required: 'Enter the name of the item'
  },
  description: {
    type: String,
    required: 'Enter description of the item'
  },
  available_from_date: {
    type: Date,
    default: Date.now
  },
  available_to_date: {
    type: Date
  },
  status: {
    type: [{
      type: String,
      enum: ['rented', 'available']
    }],
    default: ['available']
  },
  cost: {
    type: Number
  },
  user_ID: {
    type: String,
      required: 'Enter the owner ID'
  }
});

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
        default date.now()
    }

});

module.exports = mongoose.model('Ads', AdModel);
module.exports = mongoose.model('Users', UserModel);