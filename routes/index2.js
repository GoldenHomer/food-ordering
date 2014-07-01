var express = require('express');
var router = express.Router();

var restaurantUsers = [];
var restaurantNames = ['Pizza2','iPho','Restaurant 3','Rest 5','qwewe','Food'];
var menuItems = Array();
var menuItemsForCurrentOrder = '';
var sessionID;

var voted = 0, maxVotes = restaurantNames.length;

var users = [["t", "melvin", "hello@hello.com", 'admin', 'offline'],
["Peter Kim", "hamburger", "peter@kim.com", 'notadmin', 'offline']];

//GET Login page
router.get('/', function(req, res) {
    res.render('login', {title: 'Login'})
});

//GET all pages
router.get('/list', function(req, res) {
    res.render('list');
});

//GET user greeting page
router.get('/greeting', function(req, res) {

    console.log(sessionID);
    var db = req.db;
    var collection = db.get('logInId');

    collection.find({ id: sessionID }).on('success', function (doc) {

        if (doc[0].admin === "yes") {
            res.redirect('greetingadmin', { title: 'Greetings, Admin!'});
        }
        else {
            res.render('greeting', { title: 'Greetings, Student!'});
        }
    });
});

//GET admin greeting page
router.get('/greetingadmin', function(req, res) {

    console.log(sessionID);
    var db = req.db;
    var collection = db.get('logInId');

    collection.find({ id: sessionID }).on('success', function (doc) {

        if (doc[0].admin === "yes") {
            res.render('greetingadmin', { title: 'Greetings, Admin!'});
        }
        else {
            res.redirect('greeting', { title: 'Greetings, Student!'});
        }
    });
});

//POST login page
router.post('/', function(req, res) {

    //Request internal DB variable
    var db = req.db;

    //Request username and password
    var username = req.body.username;
    var password = req.body.password;

    //Set collection
    var collection = db.get('usercollection');
    var login = db.get('logInId');
    var loginUserName = collection.find({ "username": username });

    //Login request
    collection.findOne({ username: username }).on('success', function (doc) {
        if (doc.password === password) {
            if(doc.admin === "1") {

                sessionID = Math.random() * 100;
                login.insert ({ "id" : sessionID, admin: "yes"});
                res.redirect('greetingadmin');
            }
            else {

//                var query = qs.stringify({ user: doc.username, admin: doc.admin });
sessionID = Math.random() * 100;
login.insert ({ "id" : sessionID, admin: "no"});
res.redirect('greeting');

}
}
else {

            //Wrong Password
            res.redirect('/login');

        }
    })
    .on('error', function(err) {
            //Wrong Username
            res.redirect('/login');
        });

});

//POST to Add User Service
router.post('/adduser', function(req, res) {

    //Set internal DB variable
    var db = req.db;

    //Get form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userPassword = req.body.userpassword;
    var userAdmin = req.body.useradmin;

    //Set collection
    var collection = db.get('usercollection');

    //Submit to the DB
    collection.insert ({
        "username" : userName,
        "email" : userEmail,
        "password" : userPassword,
        "admin" : userAdmin
    }, function (err, doc) {
        if (err) {
            //If failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.location("userlist");

            res.redirect('userlist');
        }
    });
});


//POST to Add Restaurant Service
router.post('/addrest', function(req, res) {

    //Set internal DB variable
    var db = req.db;

    //Get form values. These rely on the "name" attributes
    var restaurantName = req.body.restname;
    var restaurantNumber = req.body.restnumber;
    var restaurantMenuItem = req.body.menuitem;
    var userAdmin = req.body.useradmin;

    //Set collection
    var collection = db.get('restcollection');

    //Submit to the DB
    collection.insert ({
        "restname" : restaurantName,
        "restnumber" : restaurantNumber,
        "menuitem" : restaurantMenuItem,
        "admin" : userAdmin
    }, function (err, doc) {
        if (err) {
            //If failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.location("restedit");

            res.redirect('restedit');
        }
    });
});

//POST to Update User service
router.post('/updateuser', function(req, res) {

    var db = req.db;

    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var userPassword = req.body.userpassword;
    var userAdmin = req.body.useradmin;

    var collection = db.get('usercollection');

    collection.update (
        { username: userName },
        {
            username: userName,
            email: userEmail,
            password: userPassword,
            admin: userAdmin
        }, function (err, doc) {
            if(err) {
                //If failed, return error
                res.send("There was a problem modifying the selected user.");
            }
            else {
                res.location("userlist");

                res.redirect("userlist");
            }
        })
});

//POST to REMOVE USER
router.post('/removeuser', function(req, res) {
    var db = req.db;

    var userName = req.body.username;

    var collection = db.get('usercollection');

    collection.remove(
        {  username: userName },
        function (err, doc) {
            if(err) {
                res.send("There was a problem deleting the information from the database.");
            }
            else {
                res.location("userlist");

                res.redirect("userlist");
            }
        })
});

//GET User Page
router.param('name', function(req, res, next, name) {
    var collection = db.get('usercollection');

    collection.find({name: name}, function(err, docs) {
        req.user = docs [0];
        next();
    })
});

//SHOW User Page
router.get('/users/:name', function(req, res) {
    res.render("users/show", {username: req.username});
});

module.exports = router;

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    console.log(sessionID);
    var db = req.db;
    var access = db.get('logInId');
    var collection = db.get('usercollection');

    access.find({ id: sessionID }).on('success', function (doc) {

        if (doc[0].admin === "yes") {
            collection.find({},{},function(e,docs){
                res.render('userlist', {"userlist" : docs});
            });
        }   else {
            res.location("greeting");
            res.redirect('greeting');
        }
    })
});

/* GET Restaurant page. */
router.get('/restedit', function(req, res) {
    var db = req.db;
    var collection = db.get('restcollection');
    collection.find({},{},function(e,docs){
        res.render('restedit', {
            "restedit" : docs
        });
    });
});

/* GET Assignments home page. */
router.get('/assignments', function (req, res) {
    res.render('assignments', { title: 'Assignments' });
});


/* SHOW Phase1Sprint1 page. */
router.get('/ph1sp1', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs11 = " + docs);
        console.log("docs11 = " + docs[0].phase);
        console.log("docs11 = " + docs[2].phase);

        res.render('ph1sp1', {
            "questions" : docs,
            "tasks" : docs,
            "answers" : docs
        });

    });
});

/* POST to Add task ph1sp1 */
router.post('/addTaskSave11', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var taskInput = req.body.inputTask;
    console.log("Task is =" + taskInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint1" },
        { $push: { tasklist : { task : taskInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + taskInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph1sp1admin");
                // And forward to success page
                res.redirect("ph1sp1admin");
            }
        });
});

/* POST to Add Question ph1sp1 */
router.post('/addQuestionSave11', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var questionInput = req.body.inputQuestion;
    console.log("Question is =" + questionInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint1" },
        { $push: { questionlist : { question : questionInput }}},
        function (err, doc) {
        if (err) {
            console.log("error saving sprint 1 to the database");

            // If it failed, return error
            res.send("There was a problem saving sprint 1 to the database.");
        }
        else {
            console.log("inserted comments: " + questionInput);

            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("ph1sp1");
            // And forward to success page
            res.redirect("ph1sp1");
        }
    });
});



/* SHOW Phase1Sprint2 page. */
router.get('/ph1sp2', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs12 = " + docs);
        console.log("docs12 = " + docs[1].sprint);
        console.log("docs12 = " + docs[1].sprint);


        res.render('ph1sp2', {
            "questions" : docs,
            "title": "Phase 1 Assignments"
        });
    });
});

/* POST to Add Question ph1sp2 */
router.post('/addQuestionSave12', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var questionInput = req.body.inputQuestion;
    console.log("Question is =" + questionInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint2" },
        { $push: { questionlist : { question : questionInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + questionInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph1sp2");
                // And forward to success page
                res.redirect("ph1sp2");
            }
        });
});

/* SHOW Phase2Sprint1 page. */
router.get('/ph2sp1', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs21 = " + docs);
        console.log("docs21 = " + docs[2].sprint);
        console.log("docs21 = " + docs);


        res.render('ph2sp1', {
            "questions" : docs,
            "title": "Phase 2 Assignments"
        });
    });
});

/* POST to Add Question ph2sp1 */
router.post('/addQuestionSave21', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var questionInput = req.body.inputQuestion;
    console.log("Question is =" + questionInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase2", sprint: "sprint1" },
        { $push: { questionlist : { question : questionInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + questionInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph2sp1");
                // And forward to success page
                res.redirect("ph2sp1");
            }
        });
});

/* SHOW Phase2Sprint2 page. */
router.get('/ph2sp2', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs22 = " + docs);
        console.log("docs22 = " + docs[3].sprint);
        console.log("docs22 = " + docs[3].sprint);


        res.render('ph2sp2', {
            "questions" : docs,
            "title": "Phase 2 Assignments"
        });
    });
});

/* POST to Add Question ph2sp2 */
router.post('/addQuestionSave22', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var questionInput = req.body.inputQuestion;
    console.log("Question is =" + questionInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase2", sprint: "sprint2" },
        { $push: { questionlist : { question : questionInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + questionInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph2sp2");
                // And forward to success page
                res.redirect("ph2sp2");
            }
        });
});


/* GET Phase1Sprint1Admin Questions page. */
router.get('/ph1sp1admin', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs11a = " + docs);
        console.log("docs11a = " + docs[0].phase);

        res.render('ph1sp1admin', {
            "questions" : docs,
            "answers" : docs,
            "tasks" : docs
        });
    });
});

/* POST to Add task ph1sp1admin */
router.post('/addTaskSave11', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var taskInput = req.body.inputTask;
    console.log("Task is =" + taskInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint1" },
        { $push: { tasklist : { task : taskInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + taskInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph1sp1admin");
                // And forward to success page
                res.redirect("ph1sp1admin");
            }
        });
});

/* POST to Add Grade ph1sp1admin */
router.post('/addTaskSave11', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var taskInput = req.body.inputTask;
    console.log("Task is =" + taskInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint1" },
        { $push: { tasklist : { task : taskInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + taskInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph1sp1admin");
                // And forward to success page
                res.redirect("ph1sp1admin");
            }
        });
});

/* POST to Add Answer ph1sp1admin */
router.post('/addAnswerSave11', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var answerInput = req.body.inputAnswer;
    console.log("Answer is =" + answerInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint1" },
        { $push: { answerlist : { answer : answerInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + answerInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph1sp1admin");
                // And forward to success page
                res.redirect("ph1sp1admin");
            }
        });
});



/* GET Phase2Sprint1Admin Questions page. */
router.get('/ph2sp1admin', function (req, res) {
    var db = req.db;
    var collection = db.get('assignmentcollection');
    collection.find({},{},function(e,docs){
        console.log("docs = " + docs);
        console.log("docs = " + docs[2].phase);

        res.render('ph2sp1admin', {
            "questions" : docs,
            "answers" : docs
        });
    });
});

/* POST to Add Answer ph2sp1admin */
router.post('/addAnswerSave21', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var answerInput = req.body.inputAnswer;
    console.log("Answer is =" + answerInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase2", sprint: "sprint2" },
        { $push: { answerlist : { answer : answerInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + answerInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph2sp1");
                // And forward to success page
                res.redirect("ph2sp1");
            }
        });
});

/* GET order submit page. */
router.get('/userOrderSubmit', function(req, res) {
  res.render('userOrderSubmit',{title:'Order Submission'});
});

/* GET new order page. */
router.get('/neworder', function(req, res) {
  // res.render('neworder');

  console.log(sessionID);
  var db = req.db;
  var access = db.get('logInId');

  access.find({ id: sessionID }).on('success', function (doc) {

    if (doc[0].admin === "yes") {
        // var db = req.db;
        // var restaurantcollection = db.get('restaurantcollection');
        // restaurantcollection.find({},{},function(e,orderdocs){
        //     console.log("orderdocs = " + orderdocs);
        //     res.render('neworder', {
        //         "restlist" : orderdocs
        //     });
        // });
        var db = req.db;
        var collection = db.get('ordercollection');
        collection.find({},{},function(e,orderdocs){
            res.render('neworder', {
                "newOrder" : orderdocs
            });
        });

    }
    else {
        res.location("greeting");
        res.redirect('greeting');
    };
});
});

//POST to REMOVE orders
router.post('/removeorders', function(req, res) {
    var db = req.db;

    var userName = req.body.username;

    var collection = db.get('ordercollection');

    collection.remove(
        {  username: userName },
        function (err, doc) {
            if(err) {
                res.send("There was a problem deleting the information from the database.");
            }
            else {
                res.location("neworder");

                res.redirect("neworder");
            }
        })
});

/* GET order history page. */
router.get('/orderhistory', function(req, res) {
  // res.render('orderhistory');
  console.log(sessionID);
  var db = req.db;
  var access = db.get('logInId');

  access.find({ id: sessionID }).on('success', function (doc) {

    if (doc[0].admin === "yes") {


        var db = req.db;
        var collection = db.get('orderhistorycollection');
        collection.find({}, { sort:[['date',-1]]},function(err, docs){
            console.log("docs = " + docs[0]);
            console.log("docs.order = " + docs[0].order);
            console.log("docs.order = " + docs[0].order.restname);
            console.log("docs = " + docs.order);
            res.render('orderhistory', {
                "orderHistory" : docs
            });

        });
    }   else {
        res.location("greeting");
        res.redirect('greeting');
    };
});
});


  /* Select Rest andn POST to where???*/
// router.post('/selectrestaurant', function(req, res) {
    ///*res.render('newrestaurant', { title: 'Add New Restaurant' });
    // var selectedrest = req.body.rest.name;
    /*console.log("selected rest "+selectedrest);*/
//     console.log(selectedrest);
// });

/* Winning Rest and POST to results???*/
// router.get('/winningrestaurant', function(req, res) {
//     console.log('top of winningrestaurant');
    ///*res.render('newrestaurant', { title: 'Add New Restaurant' });
    /*var selectedrest = req.body.rest.name;
    /*console.log("selected rest "+selectedrest);*/
    /*console.log(selectedrest);*/

    // ++voted;
    // voted = voted % maxVotes;

    // console.log('in index.js voted='+voted);
    //res.writeHead(200, {"Content-Type": "text/plain"});
    //res.send(voted); // You Can Call Response.write Infinite Times BEFORE response.end
    //res.end();

    //res.location("restaurantlist");
    // And forward to success page
//     res.redirect("restaurantlist");
// });

/* POST to submit menu item CLIENT*/
router.post('/NewItemForCurrentOrder', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var orderInput = req.body.selecteditem;

    var requestInput = req.body.specialRequest;


    // Set our collection
    var collection = db.get('ordercollection');

    // Submit to the DB
    collection.update(
        { restname: "Z Pizza" },
        { $push: { orderitems: {username: "Oswald", menuitem: orderInput, specialreq: requestInput}}},
        function (err, doc) {
            if(err) {
                res.send("There was a problem submitting your menu item.");
            }
            else {
                res.location("restaurantlist");

                res.redirect("restaurantlist");
            }
        })
});

/* POST to submit menu item */
router.post('/NewItemForCurrentOrderAdmin', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var orderInput = req.body.selecteditem;

    var requestInput = req.body.specialRequest;


    // Set our collection
    var collection = db.get('ordercollection');

    // Submit to the DB
    collection.update(
        { restname: "Z Pizza" },
        { $push: { orderitems: {menuitem: orderInput, specialreq: requestInput}}},
        function (err, doc) {
            if(err) {
                res.send("There was a problem submitting your menu item.");
            }
            else {
                res.location("neworder");

                res.redirect("neworder");
            }
        })
});

/* GET New Restaurant page. */
router.get('/newrestaurant', function(req, res) {

    console.log(sessionID);
    var db = req.db;
    var collection = db.get('logInId');

    collection.find({ id: sessionID }).on('success', function (doc) {

        if (doc[0].admin === "yes") {

            res.render('newrestaurant', { title: 'Add New Restaurant' });
        }
        else {
            res.redirect('restaurantlist');
        }
    });
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

/* GET Delete Restaurant page. */
router.get('/deleterestaurant', function(req, res) {
    console.log(sessionID);
    var db = req.db;
    var collection = db.get('logInId');

    collection.find({ id: sessionID }).on('success', function (doc) {

        if (doc[0].admin === "yes") {
            res.render('deleterestaurant', { title: 'Delete Restaurant' });
        }
        else {
            res.location("greeting");
            res.redirect('greeting');
        }
    });
});

/* POST to Delete Restaurant Service */
router.post('/removerestaurant', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var restName = req.body.restname;

    // Set our collection
    var collection = db.get('restcollection');

    // Submit to the DB
    collection.remove({
        "restname" : restName
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("restaurantlist");
            // And forward to success page
            res.redirect("restaurantlist");
        }
    });
});

/* POST to remove restaurant*/
router.post('/removerestaurant', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var restName = req.body.restname;

    // Set our collection
    var collection = db.get('ordercollection');

    // Submit to the DB
    collection.remove({
        "restname" : restName
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("restaurantlist");
            // And forward to success page
            res.redirect("restaurantlist");
        }
    });
});

/* GET restaurant list CLIENT */
router.get('/restaurantlist', function(req, res) {
    var db = req.db;
    var collection = db.get('restaurantcollection');
    collection.find({},{},function(e,docs){
        res.render('restlist', {
            "restlist" : docs,
            "voted":voted
        });
    });
});

/* GET restaurant list ADMIN */
router.get('/adminOrderSubmit', function(req, res) {
    var db = req.db;
    var collection = db.get('restaurantcollection');
    collection.find({},{},function(e,docs){
        res.render('adminOrderSubmit', {
            "restlist" : docs
        });
        res.location("neworder");

        res.redirect("neworder");
    });
});


/* POST to vote for restaurant */
router.post('/selectrestaurant', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var selectedrestaurant = req.body.rest[name];

    // Set our collection
    var collection = db.get('votecollection');

    // Submit to the DB
    collection.update(
        { restname: "Z Pizza" },
        { $push: { restaurantvote: {restaurantvote: selectedrestaurant}}},
        function (err, doc) {
            console.log(selectedrestaurant)
            if(err) {
                res.send("There was a problem submitting your menu item.");
            }
            else {
                res.location("restaurantlist");

                res.redirect("restaurantlist");
            }
        })
});

/* GET Restaurantlist page. */
router.get('/restaurantlistadmin', function(req, res) {

    console.log(sessionID);
    var db = req.db;
    var access = db.get('logInId');

    access.find({ id: sessionID }).on('success', function (doc) {

        if (doc[0].admin === "yes") {

            var db = req.db;
            var collection = db.get('restcollection');
            collection.find({},{},function(e,docs){
                res.render('restlistadmin', {
                    "restlistadmin" : docs,
                    "voted":voted
                })
            });
        } else {
            res.location("greeting");
            res.redirect('greeting');
        };
    });
});

/* POST to submit order */
router.post('/orderform', function(req, res) {

    console.log(sessionID);
    var db = req.db;
    var access = db.get('logInId');

    access.find({ id: sessionID }).on('success', function (doc) {

        if (doc[0].admin === "yes") {

            // Set our internal DB variable
            var db = req.db;

            var restaurantPhone = req.body.restaurantPhone;
            var restaurantName = req.body.restaurantName;
            var currentdate = new Date();
            // var date =  currentdate.getMonth()+1 + "/" + Number(currentdate.getDay())+20;
            // var time = currentdate.getHours() + ":" + currentdate.getMinutes();

            // Set our collection
            var collection = db.get('orderhistorycollection');

            var rand1 = Math.floor(20 * Math.random()) + 1;

            // Submit to the DB
            db.ordercollection.remove({});
            collection.insert(
                {order: {restname: restaurantName, date: currentdate, price: ""}},
                function (err, doc) {
                    if(err) {
                        res.send("There was a problem submitting your menu item.");
                    }
                    else {
                        console.log('restaurantname = ' + restaurantName);
                        res.location("orderhistory");

                        res.redirect("orderhistory");
                    }
                })
} else {
            res.location("greeting");
            res.redirect('greeting');
        };
});
});

    // //SIGNOUT GET
    // router.get('/signout', function(req, res) {
    //     res.location('/');
    //     res.redirect('/');
    // });

    // //SIGNOUT BUTTON
    // router.post('/signout', function(req, res) {

    //     var db = req.db;

    //     var login = db.get('logInId');

    //     login.remove({});
    // });
/* POST to Add task ph1sp1 */
router.post('/addTaskSave11', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    var taskInput = req.body.inputTask;
    console.log("Task is =" + taskInput);


    // Set our collection
    var collection = db.get('assignmentcollection');

    // Submit to the DB
    collection.update(
        { phase: "phase1", sprint: "sprint1" },
        { $push: { tasklist : { task : taskInput }}},
        function (err, doc) {
            if (err) {
                console.log("error saving sprint 1 to the database");

                // If it failed, return error
                res.send("There was a problem saving sprint 1 to the database.");
            }
            else {
                console.log("inserted comments: " + taskInput);

                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("ph1sp1admin");
                // And forward to success page
                res.redirect("ph1sp1admin");
            }
        });
});

module.exports = router;
