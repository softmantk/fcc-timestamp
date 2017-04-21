var express  = require("express");
var app = express();
app.get('/', function(req, res){
    console.log('hello world')
    res.send("Hello World")
}).listen(8080)