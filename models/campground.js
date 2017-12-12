var mongoose = require("mongoose");

//SCHEMA set up
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description:  String
});

module.exports = mongoose.model("Campground", campgroundSchema);