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
				// if(res.data[i].status === "current") {
				// 	$scope.buckets.push(res.data[i]);
				// 	$scope.getLocations(res.data[i]);
				// };
				$scope.buckets.push(res.data[i]);
					$scope.getLocations(res.data[i]);
			};
		})
		return $scope.buckets;
	}

	$scope.getBuckets = function () {
	$scope.buckets = [];
		mapService.getBuckets().then(function(res) {
			for (var i = 0; i < res.data.length; i++) {
				// console.log(res.data[i]);
				// if(res.data[i].status === "current") {
				// 	$scope.buckets.push(res.data[i]);
				// 	mapService.populateBuckets($scope.buckets[i], $scope.refreshMap, $scope.getBuckets);
				// 	$scope.getLocations(res.data[i]);
				// };
				$scope.buckets.push(res.data[i]);
					mapService.populateBuckets($scope.buckets[i], $scope.refreshMap, $scope.getBuckets);
					$scope.getLocations(res.data[i]);
			};			
		});
	};
	$scope.getBuckets();

	$scope.initMap = function () { 
		if(!$scope.map){
			console.log("getting map");
			$scope.map = mapService.initMap();
		};
	};
	$scope.initMap();
	
	$scope.getSearchBox = function () {
		mapService.getSearchBox();
	};
	$scope.getSearchBox();
	
	$scope.clickAddBucket = function () {
		mapService.clickAddBucket({description: "Enter BucketList Item"}, $scope.refreshMap, $scope.getBuckets);
	};
	$scope.clickAddBucket();

});


