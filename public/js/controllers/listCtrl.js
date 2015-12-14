angular.module('bucketList').controller('listCtrl', function($scope, listService) {

	$scope.items = [];

	$scope.refreshList = function() {
		$scope.items = [];
		listService.getItems().then(function(res) {
			for (var i = 0; i < res.data.length; i++) {
				$scope.items.push(res.data[i]);
			}
		})
		return $scope.Items;
	};

	$scope.getList = function () {
		$scope.items = [];
		listService.getItems().then(function(res) {
			for (var i = 0; i < res.data.length; i++) {
				$scope.items.push(res.data[i]);
			}
				console.log("List created", res);

		})
	}
	$scope.getList();

	$scope.createItem = function (item) {
		listService.createItem(item).then(function(res) {
			console.log("Item created", res);
			$scope.refreshList();
			$scope.newItem = "";
		})
	}

	$scope.deleteItem = function (item) {
		listService.deleteItem(item).then(function(res) {
			console.log("deleted", res);
			$scope.refreshList();
		})
	};

	$scope.editItem = function (item) {
		$scope.change = item.description;
		item.editing = true;
	}

	$scope.cancel = function (item) {
		item.editing = false;
	};

	$scope.saveItem = function (item, change) {
		item.editing = false;
		listService.editItem(item, change).then(function(res) {
			$scope.refreshList();
		})
	};

	// $scope.getSearchBox = function() {
	// 	$scope.searchBox = listService.getSearchBox();
	// }
	// $scope.getSearchBox();

});


















