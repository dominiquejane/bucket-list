angular.module('bucketList').controller('mapCtrl', function($scope, mapService, $state) {

	$scope.getLocations = function (marker) {
		marker.location = mapService.getLocations(marker);
		return marker;
	}

	$scope.buckets = [];


	$scope.refreshMap = function() {
		$scope.buckets = [];
		mapService.getBuckets().then(function(res) {
			for (var i = 0; i < res.data.length; i++) {
				$scope.buckets.push(res.data[i]);
				$scope.getLocations(res.data[i]);
			}
		})
		return $scope.buckets;
	}


	$scope.getBuckets = function () {
	$scope.buckets = [];
		mapService.getBuckets().then(function(res) {
			for (var i = 0; i < res.data.length; i++) {
				$scope.buckets.push(res.data[i]);
				mapService.populateBuckets($scope.buckets[i], $scope.refreshMap);
				$scope.getLocations(res.data[i]);
			}
		});
	};
	$scope.getBuckets();

	$scope.getSearchBox = function () {
		// mapService.getSearchBox($scope.getBuckets);
		mapService.getSearchBox();
	};
	$scope.getSearchBox();


	$scope.initMap = function () { 
		console.log("getting map");
		$scope.map = mapService.initMap();
	};
	$scope.initMap();

	$scope.clickAddBucket = function () {
		mapService.clickAddBucket({description: "Enter BucketList Item"}, $scope.refreshMap);
	};
	$scope.clickAddBucket();


});


