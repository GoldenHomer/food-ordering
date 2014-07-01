var express = require('express');
var router = express.Router();

var restaurantUsers = [];
var voted = 0, maxVotes = 3;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET template page. */
router.get('/sitepage', function(req, res) {
  res.render('template');
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});



/* GET Delete User page. */
router.get('/deleteuser', function(req, res) {
    res.render('deleteuser', { title: 'Delete User' });
});

/* POST to Delete User Service */
router.post('/removeuser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.remove({
        "username" : userName
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* GET Restaurantlist page. */
router.get('/restaurantlist', function(req, res) {
    var db = req.db;
    var collection = db.get('restcollection');
    collection.find({},{},function(e,docs){
        res.render('restlist', {
                "restlist" : docs,
                "voted":voted
            });
        });
    });

/* Select Rest andn POST to where???*/
router.post('/selectrestaurant', function(req, res) {
    ///*res.render('newrestaurant', { title: 'Add New Restaurant' });
    var selectedrest = req.body.rest.name;
    /*console.log("selected rest "+selectedrest);*/
    console.log(selectedrest);
});

/* Winning Rest and POST to results???*/
router.get('/winningrestaurant', function(req, res) {
    console.log('top of winningrestaurant');
    ///*res.render('newrestaurant', { title: 'Add New Restaurant' });
    /*var selectedrest = req.body.rest.name;
    /*console.log("selected rest "+selectedrest);*/
    /*console.log(selectedrest);*/

    ++voted;
    voted = voted % maxVotes;

    console.log('in index.js voted='+voted);
    //res.writeHead(200, {"Content-Type": "text/plain"});
    //res.send(voted); // You Can Call Response.write Infinite Times BEFORE response.end
    //res.end();

    //res.location("restaurantlist");
    // And forward to success page
    res.redirect("restaurantlist");
});

/* GET New Restaurant page. */
router.get('/newrestaurant', function(req, res) {
    res.render('newrestaurant', { title: 'Add New Restaurant' });
});

/* POST to Add Rest Service */
router.post('/addrestaurant', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var restName = req.body.restname;
    var restPhone = req.body.restphone;
    console.log("restName ="+restName);
    console.log("restPhone ="+restPhone);

    // Set our collection
    var collection = db.get('restcollection');

    // Submit to the DB
    collection.insert({
        "restname" : restName,
        "restphone" : restPhone
    }, function (err, doc) {
        if (err) {
            console.log("rest error");
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            console.log("not error");
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("restaurantlist");
            // And forward to success page
            res.redirect("restaurantlist");
        }
    });
});

module.exports = router;
