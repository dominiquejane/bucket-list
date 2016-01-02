angular.module('bucketList').controller('completedCtrl', function ($scope, completedService, mapService) {


	$scope.buckets = [];
	$scope.items = [];

	$scope.getLocations = function (marker) {
		marker.location = mapService.getLocations(marker);
		return marker;
	}

	$scope.getCompleted = function () {
		console.log("activated");
		completedService.getCompleted()
		.then(function(res) {
			console.log(res);
			var b = res.buckets.data;
			var l = res.items.data;
			for (var i = 0; i < b.length; i++) {
				$scope.getLocations(b[i]);
				$scope.buckets.push(b[i]);
			}
			for (var k = 0; k < l.length; k++) {
				$scope.items.push(l[k]);
			}
		})
	}
	$scope.getCompleted();
});
