angular.module('bucketList').controller('mapCtrl', function($scope, mapService, $state) {



	$scope.initMap = function () {
		$scope.map = mapService.initMap();
	};
	$scope.initMap();

	$scope.getBuckets = function () {
		mapService.getBuckets().then(function(res) {
			$scope.buckets = res.data;
			console.log($scope.buckets);
			for (var i = 0; i < $scope.buckets.length; i++) {
				console.log(i);
				mapService.populateBuckets($scope.buckets[i]);
			}
		});
	};

	$scope.getBuckets();

	$scope.clickAddBucket = function () {
		mapService.clickAddBucket({description: "Click edit/save to enter BucketList Item"})
	};

	$scope.clickAddBucket();


});

//able to populate buckets. need to a) add a delete request when the delete button is clicked, b) correct the post/put requests on the infowindow so post only gets called once per bucket created, and the rest of the clicks result in a put/patch request when saveBtn is clicked.. This may mean taking out the post request in the editBtn function. 
