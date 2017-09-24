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
    type: Number,
    required: 'Enter the name of the item'
  },
  owner_name: {
    type: String
  }
});

module.exports = mongoose.model('Ads', AdModel);