/**
 * Created by Mac003 on 15/2/26.
 */
// server.js
// load the things we need
var express = require('express');
var app = express();

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

app.engine('.html', require('ejs').__express);
// Optional since express defaults to CWD/views

app.set('views', __dirname + '/views');
// set the view engine to ejs
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

// index page
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/fellowship', function(req, res) {
    res.render('fellowship');
});

// about page
app.get('/about', function(req, res) {
    res.render('views/about');
});

app.use(function(req,res){
    res.render('404');
});

app.listen(8080);