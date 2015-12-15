angular.module('bucketList').service('completedService', function ($http){

	// this.getItems = function () {
	// 	return $http({
	// 		method: 'GET',
	// 		url: 'http://localhost:9001/home'
	// 	})
	// };

	// this.getBuckets = function () {
	// 	return $http({
	// 		method: 'GET',
	// 		url: 'http://localhost:9001/map'
	// 	})
	// };

	this.getItems = function () {
		return $http({
			method: 'GET',
			url: 'http://localhost:9001/completed'
		}).then(function(res) {
			console.log(res);
		})
	};


	// this.edit = function () {
	// 	return $http({
	// 		method: 'POST',
	// 		URL: 'http://localhost:9001/completed-list',
	// 		data: {

	// 		}
	// 	})
	// };

	// this.delete

})