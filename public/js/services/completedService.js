angular.module('bucketList').service('completedService', function ($http, $q){

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
	

	this.getCompleted = function () {
    var dfd = $q.defer()

    $http({ 
        method: 'GET',
        // url: 'http://localhost:9001/completed/items'
        url: '/api/completed/items'
    }).then(function(res) {
        $http({
            method: 'GET',
            // url: 'http://localhost:9001/completed/buckets'
            url: '/api/completed/buckets'
        }).then(function(response) {
            var data = {items: res, buckets: response}
            dfd.resolve(data)
        })
    })
    return dfd.promise
	}


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