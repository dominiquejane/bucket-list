var express = require('express'),
	app = express(),
	passport = require('passport'),
	mongoose = require('mongoose'),
	port = process.env.PORT || 9001,
	bodyParser = require('body-parser'),
	session = require('express-session'),
	LocalStrategy = require('passport-local').Strategy,

	MapController = require('./server-assets/controllers/MapController'),
	MapSchema = require('./server-assets/models/MapSchema'),
	ListSchema = require('./server-assets/models/ListSchema'),
	ListController = require('./server-assets/controllers/ListController'),
	CompletedController = require('./server-assets/controllers/CompletedController'),
	User = require('./server-assets/models/user.js');

// configuration ===============================================================

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
	// if we needed req.user.verifyPassword some day...
	// User.findById(obj._id).exec().find(user) {
	// 	done(null, user);
	// }
});



app.use(bodyParser.json(), express.static(__dirname + '/public'));



// // required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
var requireAuth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).end();
	}
	next();
};

app.get('/api/users/currentUser', requireAuth, function(req, res) {
	return res.json(req.user);
});

//registration
app.post('/api/users', function(req, res) {
	console.log("sent data 3 server.js back end posting")
	User.findOne({ username: req.body.username }).exec().then(function(user) {
		if (user) {
			return res.status(409).end();
		}
		user = new User({
			username: req.body.username,
			password: req.body.password
		});
		console.log("sent data 3 server.js back end user", user);
		user.save().then(function() {
			return res.status(201).end();
		});
	});
});



//login
app.post('/api/auth/local', passport.authenticate('local', { failureRedirect: '/#/login' }), function(req, res) {
	res.redirect('/#/map');});

//logout
app.get('/api/auth/logout', function(req, res) {
	req.logout();
	return res.status(200).end();
});


app
	.get('/api/buckets', requireAuth, MapController.getBuckets)
	.post('/api/buckets', requireAuth, MapController.createBucket)
	.put('/api/buckets/:id', requireAuth, MapController.editBucket)
	.put('/api/buckets/:id', requireAuth, MapController.completeBucket)
	.delete('/api/buckets/:id', requireAuth, MapController.deleteBucket)

	.get('/api/home', requireAuth, ListController.getItems)
	.post('/api/home', requireAuth, ListController.createItem)
	.put('/api/home/:id', requireAuth, ListController.editItem)
	.put('/api/home/:id', requireAuth, ListController.completeItem)
	.delete('/api/home/:id', requireAuth, ListController.deleteItem)

	.get('/api/completed/buckets', requireAuth, CompletedController.getBuckets)
	.get('/api/completed/items', requireAuth, CompletedController.getItems);
	// .put('/completed/:id', requireAuth, CompletedController.editItem);
	// .delete('/completed/:id', requireAuth, CompletedController.deleteItem)


app.listen(port, function() {
	console.log("Listening on port ", port);
});

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/bucketlist');
mongoose.connection.once('connected', function() {
  console.log('db connected');
});


