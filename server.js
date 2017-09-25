var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Ad = require('./api/models/adModel'), //created model loading here
    User = require ('./api/models/userModel')
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/RentItDB');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var adRoutes = require('./api/routes/adRoutes'); //importing route
var userRoutes = require('./api/routes/userRoutes');
adRoutes(app); //register the route
userRouter(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
