var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('hearthdatabase', ['hearthusers']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/hearthusers', function (req, res) {
	console.log("I recieved a get request");

	db.hearthusers.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/hearthusers', function (req, res) {
	console.log(req.body);
	db.hearthusers.insert(req.body, function (err, doc) {
		res.json(doc);
	})
});

app.delete('/hearthusers/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.hearthusers.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
});

app.get('/hearthusers/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.hearthusers.findOne({_id:mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/hearthusers/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.hearthusers.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
	});
});

app.listen(3000);
console.log("server running on port 3000");