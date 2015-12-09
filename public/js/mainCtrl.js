angular.module('bucketList').controller('mainCtrl', function ($scope, mainService, $compile) {

	$scope.initMap = function () {
		$scope.map = mainService.initMap();
	};
	$scope.initMap();

	$scope.clickAddBucket = function () {
		mainService.clickAddBucket({html: "Enter BucketList Item"});
	};

	$scope.clickAddBucket();




// 	// var infoWindow = new google.maps.InfoWindow();


// //include a search box within map
// 	$scope.input = document.getElementById('pac-input');
// 	$scope.addPacInput = document.getElementById('add-pac-input');
// 	$scope.searchBox = new google.maps.places.SearchBox($scope.input);
// 	$scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push($scope.input);
// 	$scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push($scope.addPacInput);


// 	$scope.map.addListener('bounds_changed', function() {
// 		$scope.searchBox.setBounds($scope.map.getBounds());
// 	});

// 	$scope.searchBox.addListener('places_changed', function() {
// 		$scope.places = $scope.searchBox.getPlaces();
// 		if ($scope.places == 0) {
// 			return;
// 		}

// 		//Clear out the old marker
// 		$scope.markers = [];

// 		// $scope.markers.forEach(function(marker) {
// 		// 	marker.setMap(null);
// 		// });

// 		$scope.bounds = new google.maps.LatLngBounds();
// 		$scope.places.forEach(function(place) {
// 			$scope.icon = {
// 				url: place.icon,
// 				size: new google.maps.Size(71, 71),
// 				origin: new google.maps.Point(0,0),
// 				anchor: new google.maps.Point(17, 34),
// 				scaledSize: new google.maps.Size(25, 25)
// 			};

// 			$scope.markers.push(new google.maps.Marker({
// 				setMap: $scope.map,
// 				map: $scope.map,
// 				icon: $scope.icon,
// 				title: place.name,
// 				position: place.geometry.location
// 			}));

// 			if (place.geometry.viewport) {
// 				$scope.bounds.union(place.geometry.viewport);
// 			} else {
// 				$scope.bounds.extend(place.geometry.location);
// 			}
// 		});
// 		$scope.map.fitBounds($scope.bounds);

// 	});

	

// 	//add click event listener to place a marker on the map
// 	// google.maps.event.addListener(map, 'click', function(e) {

//  //    new google.maps.Marker({
//  // 			 // setMap: $scope.map,
//  //      position: e.latLng,
//  //      map: map,
//  //      icon: '../corbeille_vide.png'
//  //    });
//  //  });

// 	//add a marker

//  $scope.geocoder= new google.maps.Geocoder();

//  // $scope.markers = [];

//  var createMarker = function (info){
//     var marker = new google.maps.Marker({
//     		setMap : $scope.map,
//         map: $scope.map,
//         position: new google.maps.LatLng(info.lat(), info.lng()),
//      	  icon: '../corbeille_vide.png'

//     });
//  }

// $scope.geocoder.geocode( { 'address': $scope.inputLocation }, function(results, status) {
//  if (status == google.maps.GeocoderStatus.OK) {
//     newAddress = results[0].geometry.location;
//     $scope.map.setCenter(newAddress);
//     createMarker(newAddress);
//  }
// });

});


