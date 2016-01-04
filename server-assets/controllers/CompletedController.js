var ListSchema = require('../models/ListSchema');
var MapSchema = require('../models/MapSchema');

module.exports = {

	getItems : function (req, res) {
		ListSchema.find({status: "completed"}).exec()
		.then(function(items) {
			console.log("foundcompleteditems");
			return res.json(items);
		})
	},
	getBuckets : function (req, res) {
		MapSchema.find({status: "completed"}).exec()
		.then(function(buckets) {
			console.log("foundcompletedbuckets");
			return res.json(buckets);
		});
	}
	

}