'use strict';
module.exports = function(app) {
  var nominationList = require('../controllers/nominationController');

  // todoList Routes
  app.route('/nominations')
    .get(nominationList.getAllNominations)
    .post(nominationList.createNomination);

};