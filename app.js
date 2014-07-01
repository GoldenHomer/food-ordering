var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('localhost:27017/nodetest1');
var db = monk('mongodb://letseat:peter@dbh56.mongolab.com:27567/peter');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

const
clientSessions = require("client-sessions");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser( {keepExtensions:true, uploadDir: path.join(__dirname, '/public/pictures')}));
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(clientSessions({
  secret: 'taylorliveswithcows',
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5
}));


// //client-session START
// app.use(function(req, res, next) {
//   if (req.mySession.seenyou) {
//     res.setHeader('X-Seen-You', 'true');
//   } else {
//     // setting a property will automatically cause a Set-Cookie response
//     // to be sent
//     req.mySession.seenyou = true;
//     res.setHeader('X-Seen-You', 'false');
//   }
// });
// //client-session END

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});

module.exports = app;
