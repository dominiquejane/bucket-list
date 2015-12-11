var mongoose = require('mongoose');

var MapSchema = mongoose.model('MapSchema', new mongoose.Schema({

	description: {type: String, index: true, required: true},
	coordinates: {type: Object, required: true},
	location: {type: String},
	status: {type: String, enum: ['current', 'completed'], index: true, default: 'current'},
	flag: {type: Boolean, required: true, default: true},

}, {timestamps: true}));

module.exports = MapSchema;