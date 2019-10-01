var express = require("express");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars");
// var cheerio=require("cheerio");

// Initialize Express
var app = express();

//set up an express router
var router = express.Router();

// Require our routes file pass our router object
require("./config/routes")(router);

// Make public a static folder
app.use(express.static(__dirname + "/public"));

// connect Handlebars to our express app
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//user bodyParse in our app
app.use(bodyParser.urlencoded({
  extended: false
}));

//have every request go through our router middleware
app.use(router);

// Connect to the Mongo DB
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(db, function(error){
  if (error){
    console.log(error);
  } else{console.log("mongoose connection is successful!")}
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});