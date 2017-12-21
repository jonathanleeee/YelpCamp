var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comment new
router.get("/new", isLoggedIn, function(req, res){
    //find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log(campground);
            res.render("comments/new", {campground: campground});
        }
    });
});

//Comment create
router.post("/", isLoggedIn, function(req, res){
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
                   //add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   // save commnet
                   comment.save();
                   campground.comments.push(comment);
                   campground.save();
                   console.log(comment);
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
    });
});

//EDIT route for comment
router.get("/:comment_id/edit", function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
          res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});

//UPDATE route for comment
router.put("/:comment_id", function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updated){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   }); 
});

//DESTROY route for comment
router.delete("/:comment_id", function(req, res){
   //findByIdAndRemove
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");         
       } else {
           res.redirect("/campgrounds/" + req.params.id);
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