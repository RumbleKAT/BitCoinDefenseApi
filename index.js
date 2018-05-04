var mail = require("./mail");
var http = require("http");
var express = require("express");

var app = express();

http.createServer(app).listen(8000,function(){
    console.log("Server is Running in the http://127.0.0.1:8000/");
    var obj = {
        to : "reki318@naver.com",
        subject : "Check the Email",
        text : "Checking!...",
        html : "<h1>Hello!</h1>"
    }
});