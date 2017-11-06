var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Ad = require('./api/models/adModel'), //created model loading here
    User = require ('./api/models/userModel'),
    bodyParser = require('body-parser'),
    jsonwebtoken = require("jsonwebtoken");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/RentItDB');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });


var adRoutes = require('./api/routes/adRoutes'); //importing route
adRoutes(app); //register the route

var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);


 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    console.log(req.body);
  })

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
