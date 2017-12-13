var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    seedDB     = require("./seeds");
    

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


app.get("/", function(req, res){
   res.render("landing"); 
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds}); 
        }
    });    
});

//CREATE - add new campground to DB
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

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new");
});

// SHOW show more info about one campgroun
app.get("/campgrounds/:id", function(req, res){
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

//=======================
//COMMENTS ROUTES
//=======================

app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log(campground);
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    //look up campground using ID
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
    });
    //create new commnet
    //connect new commnet to campground
    //redirect campground show page
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The yelp camp server has started"); 
});