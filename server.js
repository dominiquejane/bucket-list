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
	ListController = require('./server-assets/controllers/ListController'),
	CompletedController = require('./server-assets/controllers/CompletedController');

// mongoose.Promise = require('q').Promise;


app.use(bodyParser.json(), cors(), express.static(__dirname + '/public'));

app.get('/', function (res, req) {
		res.render('index');
	})
	.get('/map', MapController.getBuckets)
	.post('/map', MapController.createBucket)
	.put('/map/:id', MapController.editBucket)
	.put('/map/:id', MapController.completeBucket)
	.delete('/map/:id', MapController.deleteBucket)

	.get('/home', ListController.getItems)
	.post('/home', ListController.createItem)
	.put('/home/:id', ListController.editItem)
	.put('/home/:id', ListController.completeItem)
	.delete('/home/:id', ListController.deleteItem)

	.get('/completed', CompletedController.getBuckets)
	.get('/completed', CompletedController.getItems);
	// .put('/completed/:id', CompletedController.editItem);
	// .delete('/completed/:id', CompletedController.deleteItem)

//work off the status: if the status is current then allow it to be shown on map and current, 
//make two api calls to the map and current data and if the status matches completed then list it on completed page


//edit services/ctrls for filtering for 'current'
//edit services/ctrls: add completed buttons that call the completed functions
//create CompletedController and respective endpoints (Things I've done... Places I've been...)
//create completed ctrl/service/tmpl


app.listen(port, function() {
	console.log("Listening on port ", port);
});

mongoose.connect(mongoUri);
mongoose.connection.once('connected', function() {
  console.log('db connected');
});