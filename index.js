var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require('mongoose');
var db = require('./config/config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(db.url); 

require('./app/routes')(app); // configure our routes
app.listen(3000,function(){
  console.log("Started on PORT 3000");
});
exports = module.exports = app;