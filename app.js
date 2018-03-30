const express = require('express');
var app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const db = mongoose.connection;

//Connect to mongodb
db.on('error',console.error);
db.once('open',function(){
    console.log("connected to mongod server!");
});

mongoose.connect("mongodb://rumblekat:ruki9179@ds123799.mlab.com:23799/bd");

//"mongodb://localhost/bd"
var user = require('./models/users');
var tower = require('./models/tower');
var product = require('./models/product');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res , next){
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   res.header("Access-Control-Allow-Headers", "content-type");
   next();
});

const port = process.env.PORT || 8080;

//using user

var router = require("./routes/index")(app, user);
var auth = require("./routes/auth")(app, user);
var transaction = require("./routes/transaction")(app,user);

//using tower
var _tower = require("./routes/tower")(app,tower);
var shop = require("./routes/shop")(app,product);

var server = app.listen(port, function(){
    console.log("Server has started on port " + port);
});