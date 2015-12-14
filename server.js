var express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	port = process.env.PORT || 9001,
	mongoUri = 'mongodb://localhost:27017/bucketlist'
	MapController = require('./server-assets/controllers/MapController'),
	MapSchema = require('./server-assets/models/MapSchema'),
	ListSchema = require('./server-assets/models/ListSchema'),
	ListController = require('./server-assets/controllers/ListController');

// mongoose.Promise = require('q').Promise;


app.use(bodyParser.json(), cors(), express.static(__dirname + '/public'));

app.get('/', function (res, req) {
		res.render('index');
	})
	.get('/map', MapController.getBuckets)
	.post('/map', MapController.createBucket)
	.put('/map/:id', MapController.editBucket)
	.delete('/map/:id', MapController.deleteBucket)
	// .get('/home/list', MapController.getBuckets)
	// .post('/home/list', MapController.createBucket)
	// .put('/home/list/:id', MapController.editBucket)
	// .delete('/home/list/:id', MapController.deleteBucket)
	.get('/home', ListController.getItems)
	.post('/home', ListController.createItem)
	.put('/home/:id', ListController.editItem)
	.delete('/home/:id', ListController.deleteItem);


app.listen(port, function() {
	console.log("Listening on port ", port);
});

mongoose.connect(mongoUri);
mongoose.connection.once('connected', function() {
  console.log('db connected');
});