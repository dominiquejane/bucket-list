var ListSchema = require('../models/ListSchema');

module.exports = {

	createItem : function (req, res) {
		var item = new ListSchema(req.body);
		item.save().then(function(err, result) {
			console.log(res.result);
			return res.status(201).end();
		}, function (err) {
			console.log(err);
			return res.status(500).json(err);
		})
	},
	getItems : function (req, res) {
		ListSchema.find().exec()
		.then(function(items) {
			return res.json(items);
		})
	},
	editItem : function (req, res) {
		ListSchema.update({_id: req.params.id}, req.body)
		.then(function(item) {
			console.log(item);
			return res.status(200).end();
		})
	},
	deleteItem : function (req, res) {
		ListSchema.remove({_id: req.params.id}, req.body)
		.then(function(result) {
			return res.status(200).end();
		})
	}


}