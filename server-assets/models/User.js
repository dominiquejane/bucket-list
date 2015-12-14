var mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
	name: String,
	email: String,
	// twitter:{
	// 	id: String,
	// 	username: String,
	// token: String,
	// tokenString: String //store credentials/auth to make api calls whenever you need to on behalf of users
	// }
});

