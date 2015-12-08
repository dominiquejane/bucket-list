var express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 9001;


app.use(bodyParser.json(), cors(), express.static(__dirname + '/public'));

app.get('/', function (req,res) {
	res.render('index');
});


app.listen(port, function() {
	console.log("Listening on port ", port);
})