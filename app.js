var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var db = mongoose.connection;

//Connect to mongodb
db.on('error',console.error);
db.once('open',function(){
    console.log("connected to mongod server!");
});

mongoose.connect("mongodb://localhost/bd");

var user = require('./models/users');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res , next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   res.header("Access-Control-Allow-Headers", "content-type");
   next();
});

var port = process.env.PORT || 8080;
var router = require("./routes/index")(app, user);
var auth = require("./routes/auth")(app, user);

var server = app.listen(port, function(){
    console.log("Server has started on port " + port);
});