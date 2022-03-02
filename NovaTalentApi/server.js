var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Nomination = require('./api/models/nominationModel'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/Nominationdb').then(() => {
	console.log("Connected to Database");
	}).catch((err) => {
    	console.log("Not Connected to Database ERROR! ", err);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/nominationRoutes');
routes(app); //register the route


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('NovaTalent RESTful API server started on: ' + port);