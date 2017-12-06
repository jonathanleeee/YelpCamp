var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA set up
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// {
//     name: "camp2",
//     image: "https://farm7.staticflickr.com/6210/6090170567_6df55f8d83.jpg"
// }, function(err, campground){
//     if(err){
//         console.log("you fuck up there is an err");
//         console.log(err);
//     } else {
//         console.log("you didnt fuck up");
//         console.log(campground);
//     }
// });

// var campgrounds = [
//      {name: "camp1", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//      {name: "camp2", image: "https://farm7.staticflickr.com/6210/6090170567_6df55f8d83.jpg"},
//      {name: "camp3", image: "https://farm2.staticflickr.com/1255/767161131_39e0688cd2.jpg"},
//       {name: "camp1", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"},
//      {name: "camp2", image: "https://farm7.staticflickr.com/6210/6090170567_6df55f8d83.jpg"},
//      {name: "camp3", image: "https://farm2.staticflickr.com/1255/767161131_39e0688cd2.jpg"}
//  ];

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds}); 
        }
    });    
});

app.post("/campgrounds", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   
   Campground.create(newCampground, function(err, newlyCreated){
       //create new campground and save to DB
      if(err){
          console.log(err);
      } else {
          res.redirect("/campgrounds");
      }
   });
});

app.get("/campgrounds/new", function(req, res){
   res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The yelp camp server has started"); 
});