var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds}); 
        }
    });    
});

//CREATE - add new campground to DB
router.post("/", isLoggedIn,function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, image: image, description: desc, author: author};
   
   Campground.create(newCampground, function(err, newlyCreated){
       //create new campground and save to DB
      if(err){
          console.log(err);
      } else {
          console.log(newlyCreated);
          res.redirect("/campgrounds");
      }
   });
});

//NEW - show form to create new campground
router.get("/new", isLoggedIn,function(req, res){
   res.render("campgrounds/new");
});

// SHOW show more info about one campgroun
router.get("/:id", function(req, res){
    //find the campgrounds with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }  
  res.redirect("/login");
}

module.exports = router;