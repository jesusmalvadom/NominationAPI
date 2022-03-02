'use strict';


var mongoose = require('mongoose'),
  Nomination = mongoose.model('Nominations');


// Get notifications that are approved
exports.getAllNominations = function(req, res) {
  Nomination.find({status: 'approved'}, function(err, nomination) {
    if (err)
      res.send(err);
    res.json(nomination);
  });
};

exports.createNomination = function(req, res) {

  // Check paramenters
  if (req.body.talent_score < 0 || req.body.talent_score > 10 || req.body.involvement_score < 0 || req.body.involvement_score > 10) {
    res.send('Scores must be numbers between 0 and 10');
    return;
  }

  // If overall score is below 8 the nomination is rejected automatically
  if (req.body.talent_score < 8) {
    req.body.status = 'rejected';
    console.log('Overall Score below 8, sending mail to [' + req.body.peer_email + ', ' + req.body.user_email + ']');
  }

  // Store the nomination in ddbb if the peer_email is not already registered
  Nomination.find({peer_email: req.body.peer_email}, function(err, nomination) {
    if (nomination.length == 0) {
      var new_nomination = new Nomination(req.body);
      new_nomination.save(function(err, nomination) {
        if (err)
          res.send(err);
        res.json(nomination);
      });
    } else {
      res.send('Email already registered in the database');
    }
  });

  
};