angular.module('bucketList').controller('mainCtrl', function ($scope) {

	var defaultLocation = {
		zoom: 2,
		center: new google.maps.LatLng(30, 0),
		mapTypeId: google.maps.MapTypeId.ROAD
	};
	$scope.map = new google.maps.Map(document.getElementById('map'), defaultLocation);

	// function initAutocomplete() {
	//   $scope.map = new google.maps.Map(document.getElementById('map'), {
	//     center: {lat: -33.8688, lng: 151.2195},
	//     zoom: 13,
	//     mapTypeId: google.maps.MapTypeId.ROADMAP
	//   });
	// };


	$scope.markers = [];

	var infoWindow = new google.maps.InfoWindow();


//include a search box within map
	$scope.input = document.getElementById('pac-input');
	$scope.addPacInput = document.getElementById('add-pac-input');
	$scope.searchBox = new google.maps.places.SearchBox($scope.input);
	$scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push($scope.input);
	$scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push($scope.addPacInput);


	$scope.map.addListener('bounds_changed', function() {
		$scope.searchBox.setBounds($scope.map.getBounds());
	});

	$scope.searchBox.addListener('places_changed', function() {
		$scope.places = $scope.searchBox.getPlaces();
		if ($scope.places == 0) {
			return;
		}

		//Clear out the old marker
		$scope.markers.forEach(function(marker) {
			marker.setMap(null);
		});
		$scope.markers = [];

		$scope.bounds = new google.maps.LatLngBounds();
		$scope.places.forEach(function(place) {
			$scope.icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};

			$scope.markers.push(new google.maps.Marker({
				map: map,
				icon: $scope.icon,
				title: place.name,
				position: place.geometry.location
			}));

			if ($scope.place.geometry.viewport) {
				$scope.bounds.union($scope.place.geometry.viewport);
			} else {
				$scope.bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds($scope.bounds);

	});

});


