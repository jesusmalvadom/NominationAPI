'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var NominationSchema = new Schema({
  // Nominee
  peer_email: {
    type: String,
    required: 'Enter the email of the person you are going to nominate'
  },
  explanation: {
    type: String,
    required: 'Please write a short explanation'
  },
  involvement_score: {
    type: Number,
    required: 'Please enter a score between 0 and 10 for the involvement'
  },
  // If talent_score is below 8, nomination is rejected but stored
  talent_score: {
    type: Number,
    required: 'Please enter a score between 0 and 10 for the overall talent'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  // Mail of the person nominating
  user_email: {
    type: String,
    required: 'Enter your email'
  },
  status: {
    type: [{
      type: String,
      enum: ['rejected', 'approved']
    }],
    default: ['approved']
  }
});

module.exports = mongoose.model('Nominations', NominationSchema);