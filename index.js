var express = require('express');
var app = express();
var path = require("path");
var MongoClient = require('mongodb').MongoClient;

app.use(express.static(__dirname));

var url = 'mongodb://localhost:27017/WebLab';
MongoClient.connect(url, function(err, db) {
	 if (err) throw err;

	app.get('/get_reviews', function (req, res) {
		db.collection('Reviews').find({}).toArray(function(err, reviews) {
			res.send(reviews);
		});
	});
	
	app.get('/get_news', function (req, res) {
		db.collection('News').find({}).toArray(function(err, news) {
			res.send(news);
		});
	});
	
	app.post('/add_review', function (req, res) {
		db.collection('Reviews').insertMany([{'html': req.query['html'] + "#ff0000\">"}]);
	});
	
	app.post('/add_news', function (req, res) {
		db.collection('News').insertMany([{'html': req.query['html'] + "#ff0000\">"}]);
	});
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname + '/admin.html'));
});

app.get('/contacts', function (req, res) {
  res.sendFile(path.join(__dirname + '/contacts.html'));
});

app.get('/news', function (req, res) {
  res.sendFile(path.join(__dirname + '/news.html'));
});

app.get('/rewievs', function (req, res) {
  res.sendFile(path.join(__dirname + '/rewievs.html'));
});

app.get('/curiculum', function (req, res) {
  res.sendFile(path.join(__dirname + '/curiculum.html'));
});

app.listen(3000);