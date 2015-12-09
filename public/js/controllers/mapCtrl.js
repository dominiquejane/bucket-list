angular.module('bucketList').controller('mapCtrl', function($scope, mapService, $state) {



	$scope.initMap = function () {
		$scope.map = mapService.initMap();
	};
	$scope.initMap();

	$scope.getBuckets = function () {
		mapService.getBuckets().then(function(res) {
			$scope.buckets = res.data;
			console.log($scope.buckets);
		});
	};

	$scope.getBuckets();

	$scope.clickAddBucket = function () {
		mapService.clickAddBucket({html: "Click edit/save to enter BucketList Item"})
	};

	$scope.clickAddBucket();


});