var express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	port = process.env.PORT || 9001,
	mongoUri = 'mongodb://localhost:27017/bucketlist'
	MapController = require('./server-assets/controllers/MapController'),
	MapSchema = require('./server-assets/models/MapSchema');

// mongoose.Promise = require('q').Promise;


app.use(bodyParser.json(), cors(), express.static(__dirname + '/public'));

app.get('/', function (res, req) {
		res.render('index');
	})
	.get('/map', MapController.getBuckets)
	.post('/map', MapController.createBucket)
	.put('/map/:id', MapController.editBucket)
	.delete('/map/:id', MapController.deleteBucket);


app.listen(port, function() {
	console.log("Listening on port ", port);
});

mongoose.connect(mongoUri);
mongoose.connection.once('connected', function() {
  console.log('db connected');
});