angular.module('bucketList').controller('mapCtrl', function($scope, mapService, $state) {


	$scope.getBuckets = function () {
		mapService.getBuckets().then(function(res) {
			$scope.buckets = res.data;
			console.log($scope.buckets);
			for (var i = 0; i < $scope.buckets.length; i++) {
				// console.log($scope.buckets[i]);
				mapService.populateBuckets($scope.buckets[i]);
			}
		});
	};

	$scope.getBuckets();


	$scope.initMap = function () { 
		$scope.map = mapService.initMap();
	
	};
	$scope.initMap();

	

	$scope.clickAddBucket = function () {
		mapService.clickAddBucket({description: "Enter BucketList Item"})
	};

	$scope.clickAddBucket();


});


