var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
       name: "Yosemite",
       image: "https://www.yosemite.com/wp-content/uploads/2016/04/Pines-campground.jpg",
       description: "what's up what's up"
    },
    {
       name: "Yosemite 2",
       image: "http://www.parkcamper.com/Yosemite-National-Park/Wawona-campground-yosemite.jpg",
       description: "Whats up yosemite"
    },
    {
       name: "Yosemite 3",
       image: "https://www.yosemite.com/wp-content/uploads/2016/04/upper-pines.png",
       description: "What's up dawg"
    }
];

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;

