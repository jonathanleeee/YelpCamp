var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
     {name: "camp1", img: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
     {name: "camp2", img: "https://farm7.staticflickr.com/6210/6090170567_6df55f8d83.jpg"},
     {name: "camp3", img: "https://farm2.staticflickr.com/1255/767161131_39e0688cd2.jpg"},
      {name: "camp1", img: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
     {name: "camp2", img: "https://farm7.staticflickr.com/6210/6090170567_6df55f8d83.jpg"},
     {name: "camp3", img: "https://farm2.staticflickr.com/1255/767161131_39e0688cd2.jpg"}
 ];

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
   res.render("campgrounds", {campgrounds: campgrounds}); 
});

app.post("/campgrounds", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, img: image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
   res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The yelp camp server has started"); 
});