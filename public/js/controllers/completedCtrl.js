angular.module('bucketList').controller('completedCtrl', function ($scope, completedService) {


	$scope.buckets = [];
	$scope.items = [];

	// $scope.getCompleted = function() {
	// 	completedService.getItems()
	// 	.then(function(res) {
	// 		console.log(res);
	// 		for (var i = 0; i < res.data.length; i++) {
	// 			if (res.data[i].status === "completed") {
	// 				$scope.items.push(res.data[i])
	// 			}
	// 		}
	// 	})
	// 	completedService.getBuckets()
	// 	.then(function(res) {
	// 		console.log(res);
	// 		for (var i = 0; i < res.data.length; i++) {
	// 			if (res.data[i].status === "completed") {
	// 				$scope.buckets.push(res.data[i])
	// 			}
	// 		}
	// 	})
	// 	console.log("items", $scope.items);
	// 	console.log("buckets", $scope.buckets);
	// }

	$scope.getCompleted = function () {
		console.log("activated");
		completedService.getItems()
		// .then(function(res) {
		// 	var x = res.data;
		// 	for (var i = 0;i < x.length; i++) {
		// 		if (x[i].coordinates){
		// 			$scope.buckets.push(x[i]);
		// 		} 
		// 		else {
		// 			$scope.items.push(x[i]);
		// 		}
		// 	}
		// 	console.log("buckets", $scope.buckets);
		// 	console.log("items", $scope.items)
		// })
	};
	$scope.getCompleted();


});