var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB     = require("./seeds");
    
seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Campground.create(
// {
//     name: "camp1",
//     image: "https://farm7.staticflickr.com/6210/6090170567_6df55f8d83.jpg",
//     description: "This is the description for camp1"
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
            res.render("index", {campgrounds: allCampgrounds}); 
        }
    });    
});

app.post("/campgrounds", function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
   
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

// SHOW show more info about one campgroun
app.get("/campgrounds/:id", function(req, res){
    //find the campgrounds with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
    //render show template with that campground
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The yelp camp server has started"); 
});