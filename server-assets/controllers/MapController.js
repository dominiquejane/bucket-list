var MapSchema = require('../models/MapSchema');

module.exports = {

	createBucket : function (req, res) {
		var bucket = new MapSchema(req.body);
		bucket.save().then(function(err, result) {
			console.log(res.result);
			return res.status(201).end();
		}, function (err) {
			console.log(err);
			return res.status(500).json(err);
		})
	},
	getBuckets : function (req, res) {
		MapSchema.find({status: "current"}).exec()
		.then(function(buckets) {
			return res.json(buckets);
		})
	},
	editBucket : function (req, res) {
		MapSchema.update({_id: req.params.id}, req.body)
		.then(function(bucket) {
			console.log(bucket);
			return res.status(200).end();
		})
	},
	deleteBucket : function (req, res) {
		MapSchema.remove({_id: req.params.id}, req.body)
		.then(function(result) {
			return res.status(200).end();
		})
	},
	completeBucket : function (req, res) {
		MapSchema.update({_id: req.params.id}, req.body)
		.then(function(result) {
			console.log(result);
			return res.status(200).end();
		})
	}

};

