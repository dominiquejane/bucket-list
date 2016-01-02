angular.module('bucketList').service('listService', function ($http) {

	this.getItems = function () {
		return $http({
			method: 'GET',
			// url: 'http://localhost:9001/home'
			url: '/api/home'
		})
	};

	this.createItem = function (item) {
		return $http({
			method: 'POST',
			// url: 'http://localhost:9001/home',
			url: '/api/home',
			data: {
				description: item
			}
		})
	};

	this.editItem = function (item, change) {
		return $http({
			method: 'PUT',
			// url: 'http://localhost:9001/home/' + item._id,
			url: 'api/home/' + item._id,
			data: {
				description: change
			}
		})
	};

	this.deleteItem = function (item) {
		return $http({
			method: 'DELETE',
			// url: 'http://localhost:9001/home/' + item._id,
			url: 'api/home/' + item._id,
		})
	};

	this.completeItem = function (item) {
		return $http({
			method: 'PUT',
			// url: 'http://localhost:9001/home/' + item._id,
			url: 'api/home/' + item._id,
			data: {
				status: "completed",
			}
		})
	}


})