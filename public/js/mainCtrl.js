angular.module('bucketList').controller('mainCtrl', function ($scope, mainService, $compile) {

	$scope.initMap = function () {
		$scope.map = mainService.initMap();
	};
	$scope.initMap();

	$scope.clickAddBucket = function () {
		mainService.clickAddBucket({html: "Click edit/save to enter BucketList Item"});
	};

	$scope.clickAddBucket();

