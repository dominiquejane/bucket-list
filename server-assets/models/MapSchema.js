var mongoose = require('mongoose');

var MapSchema = mongoose.model('MapSchema', new mongoose.Schema({

	description: {type: String, index: true, required: true},
	coordinates: {type: Object, required: true},
	status: {type: String, enum: ['current', 'completed'], index: true, default: 'current'},

}, {timestamps: true}));

module.exports = MapSchema;