var mongoose = require('mongoose');

var ListSchema = mongoose.model('ListSchema', new mongoose.Schema({
	description: {type: String, required: true},
	status: {type: String, enum: ['current', 'completed'], required: true, default: 'current'},
	editing: {type: Boolean, required: true, default: false}
}, {timestamps: true}));

module.exports = ListSchema;