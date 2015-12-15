angular.module('bucketList').service('mapService', function($http) {

	this.getBuckets = function () {
		return $http({
			method: 'GET',
			url: 'http://localhost:9001/map'
		})
	};

	var map; 
	
	this.initMap = function() {
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 2,
			center: new google.maps.LatLng(30, 0),
			mapTypeId: google.maps.MapTypeId.ROAD
		});
		return map;
	};

	this.getLocations = function(marker) {
		return $http({
			method: 'GET',
			url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + marker.coordinates.lat + "," + marker.coordinates.lng + "&key=AIzaSyBps_aa3xumXPu343xK55uiG9GK159m7Bo"
		}).then(function(res){
			var loc = res.data.results[res.data.results.length-2 || 0].formatted_address;
			return loc;
		});
	};

	this.populateBuckets = function (options, cb, completed) {
	  var marker = new google.maps.Marker({
	  	position: options.coordinates,
	    map: map,
	    icon: '../corbeille_vide.png',
	    _id: options._id,
	    description: options.description,
	    flag: false,
	  });
	  
	  //(3)Set a flag property which stands for the editing mode.
	  marker.set("editing", false);
	  
	  //(4)Create a div element to display the HTML strings.
	  var htmlBox = document.createElement("div");
	  htmlBox.innerHTML =  marker.description || "";
	  htmlBox.style.width = "200px";
	  htmlBox.style.height = "50px";
	  
	  //(5)Create a textarea for edit the HTML strings.
	  var textBox = document.createElement("input");
	  textBox.id = "text";
	  textBox.textContent = marker.description || "";
	  textBox.style.width = "200px";
	  textBox.style.height = "50px";
	  textBox.style.display = "none";	    
	  
	  //(6)Create a div element for container.
	  var container = document.createElement("div");
	  container.style.position = "relative";
	  container.appendChild(htmlBox);
	  container.appendChild(textBox);
	  
	  //(7)Create a button to switch the edit mode
	  var editBtn = document.createElement("button");
	  editBtn.innerText = "Edit";
	  container.appendChild(editBtn);

	  //create a save button
	  var saveBtn = document.createElement("button");
	  saveBtn.innerText = "Save";
	  container.appendChild(saveBtn);

	  //Create a button to delete a bucket
	  var deleteBtn = document.createElement("button");
	  deleteBtn.innerText="Delete";
	  container.appendChild(deleteBtn);

	  var completedBtn = document.createElement("button");
	  completedBtn.innerText="Completed";
	  container.appendChild(completedBtn);
	  
	  //(8)Create an info window
	  var infoWnd = new google.maps.InfoWindow({
	    content : container
	  });

	  //(10)Switch the mode. Since Boolean type for editing property,
	  //the value can be change just negation.
	  google.maps.event.addDomListener(editBtn, "click", function() {
	    marker.set("editing", !marker.editing);

	  });

	  //update marker
	  google.maps.event.addDomListener(saveBtn, "click", function () {
	  	marker.set("editing", false);
	  	return $http({
	    	method: 'PUT',
	    	url: 'http://localhost:9001/map/' + marker._id,
	    	data: {description: marker.html},
	    }).then(function(res) {
	    	cb();
	    });
	  })

	  //delete marker
	  google.maps.event.addDomListener(deleteBtn, "click", function() {
	  	var x = marker._id;
	  	marker.setMap(null);
	  	return $http({
	  		method: 'DELETE',
	    	url: 'http://localhost:9001/map/' + x,
	  	}).then(function(res) {
	  		cb();
	  	})
	  })

	  google.maps.event.addDomListener(completedBtn, "click", function() {
	  	var x = marker._id;
	  	marker.setMap(null);
	  	return $http({
	  		method: 'PUT',
	  		url: 'http://localhost:9001/map/' + x,
	  		data: {status: "completed"}
	  	}).then(function(res) {
	  		console.log("click completed");
	  		completed();
	  	})
	  })
	  
	  //(11)A (property)_changed event occur when the property is changed.
	  google.maps.event.addListener(marker, "editing_changed", function(){
	    textBox.style.display = this.editing ? "block" : "none";
	    htmlBox.style.display = this.editing ? "none" : "block";
	  });
	  
	  //(12)A change DOM event occur when the textarea is changed, then set the value into htmlBox.
	  google.maps.event.addDomListener(textBox, "change", function(){
	    htmlBox.innerHTML = textBox.value;
	    marker.set("html", textBox.value);
	  });
	  
	  //(9)The info window appear when the marker is clicked.
	 	marker.addListener('click', function() {
	  	infoWnd.open(map, marker);
		});
		return marker;
	};


	this.clickAddBucket = function (options, cb, completed) {

		return google.maps.event.addListener(map, "click", function(e) {
	  	//(2) Create a marker normally.
	    //Marker class accepts any properties even if it's not related with Marker.
	    var marker = new google.maps.Marker({
	    	position: e.latLng,
		    map: map,
		    icon: '../corbeille_vide.png',
		    flag: true,
		  });
	    
	    //(3)Set a flag property which stands for the editing mode.
	    marker.set("editing", false);
	    
	    //(4)Create a div element to display the HTML strings.
	    var htmlBox = document.createElement("div");
	    htmlBox.innerHTML = options.description || "";
	    htmlBox.style.width = "200px";
	    htmlBox.style.height = "50px";
	    
	    //(5)Create a textarea for edit the HTML strings.
	    var textBox = document.createElement("textarea");
	    textBox.innerText = "";
	    textBox.style.width = "200px";
	    textBox.style.height = "50px";
	    textBox.style.display = "none";
	    
	    //(6)Create a div element for container.
	    var container = document.createElement("div");
	    container.style.position = "relative";
	    container.appendChild(htmlBox);
	    container.appendChild(textBox);
	    
	    //(7)Create a button to switch the edit mode
	    var editBtn = document.createElement("button");
	    editBtn.innerText = "Edit";
	    container.appendChild(editBtn);

	    //create a save button
	    var saveBtn = document.createElement("button");
	    saveBtn.innerText = "Save";
	    container.appendChild(saveBtn);

	    //Create a button to delete a bucket
	    var deleteBtn = document.createElement("button");
	    deleteBtn.innerText="Delete";
	    container.appendChild(deleteBtn);

	    var completedBtn = document.createElement("button");
	    completedBtn.innerText = "Completed";
	    container.appendChild(completedBtn);
	    
	    //(8)Create an info window
	    var infoWnd = new google.maps.InfoWindow({
	      content : container
	    });

	    //(10)Switch the mode. Since Boolean type for editing property,
	    //the value can be change just negation.

	    //the initial click event to create the marker already posts and an _id exists. Call a GET request for the _id for when the use clicks 'save'. POTENTIAL BUG IF USER CREATES MORE BUCKETS BEFORE CLICKING 'SAVE' due to being unable to accurately identify specific markers => added a flag property and an 'if' statement so that the request is only called the first time 'edit' is clicked.
	    google.maps.event.addDomListener(editBtn, "click", function() {
	      marker.set("editing", !marker.editing);
	      if (marker.flag === true){
	      	marker.flag = false;
	      	return $http({
	      		method: 'GET',
	      		url: 'http://localhost:9001/map',
	      	}).then(function(res) {
	      		var ident = res.data[res.data.length-1];
	      		return marker._id = ident._id;
	      	})
	      };
	    	
	    });

	    //save marker
	    google.maps.event.addDomListener(saveBtn, "click", function () {
	    	marker.set("editing", false);
	    	return $http({
	      	method: 'PUT',
	      	url: 'http://localhost:9001/map/' + marker._id,
	      	data: {description: marker.html},
	      }).then(function(res) {
	      	cb();
	      });
	    })

	    google.maps.event.addDomListener(deleteBtn, "click", function() {
	    	if (marker.flag === true){
	      	alert("Edit and save bucket before deleting.")
	      }
	      else {
	      	var x = marker._id;
	    		marker.setMap(null);
	    		return $http({
			    		method: 'DELETE',
			      	url: 'http://localhost:9001/map/' + x,
			    	}).then(function(res) {
			    		completed();	    		
			    	})
	      }
	    });

	    google.maps.event.addDomListener(completedBtn, "click", function() {
		  	if(marker.flag === true){
		  		alert("Edit and save bucket before completing.")
		  	}
		  	else {
			  	var x = marker._id;
	  			marker.setMap(null);
	  			return $http({
			  		method: 'PUT',
			  		url: 'http://localhost:9001/map/' + x,
			  		data: {status: "completed"}
			  	}).then(function(res) {
			  		console.log("clicked completed")
			  		completed();
			  	})
		  	} 	
		  })

	    //(11)A (property)_changed event occur when the property is changed.
	    google.maps.event.addListener(marker, "editing_changed", function(){
	      textBox.style.display = this.editing ? "block" : "none";
	      htmlBox.style.display = this.editing ? "none" : "block";
	    });
	    
	    //(12)A change DOM event occur when the textarea is changed, then set the value into htmlBox.
	    google.maps.event.addDomListener(textBox, "change", function(){
	      htmlBox.innerHTML = textBox.value;
	      marker.set("html", textBox.value);
	    });
	    
	    //(9)The info window appear when the marker is clicked.
	   	marker.addListener('click', function() {
	    	infoWnd.open(map, marker);
	  	});

	  	var lat = marker.getPosition().lat();
	    var lng = marker.getPosition().lng();

			return $http({
	    	method: 'POST',
	    	url: 'http://localhost:9001/map',
	    	data: {
	    		description: options.description,
	    		coordinates: {lat: lat, lng: lng},
	    	},
	    }).then(function(res) {
	      	console.log("marker created", res);
	    	cb();
	    });

	    
	  });
		google.maps.event.addDomListener(window, "load", initialize);
	};
	



	this.getSearchBox = function (cb) {

	  // Create the search box and link it to the UI element.
	  var input = document.getElementById('pac-input');
	  var addPacInput = document.getElementById('add-pac-input');
	  var searchBox = new google.maps.places.SearchBox(input);
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(addPacInput);

	  // Bias the SearchBox results towards current map's viewport.
	  map.addListener('bounds_changed', function() {
	    searchBox.setBounds(map.getBounds());
	  });

	  var marker;
	  // // Listen for the event fired when the user selects a prediction and retrieve
	  // // more details for that place.
	  searchBox.addListener('places_changed', function() {
	    var places = searchBox.getPlaces();

	    if (places.length == 0) {
	      return;
	    }

	  //   // For each place, get the icon, name and location.
	    var bounds = new google.maps.LatLngBounds();
	    places.forEach(function(place) {
	      var icon = {
	        url: place.icon,
	        size: new google.maps.Size(71, 71),
	        origin: new google.maps.Point(0, 0),
	        anchor: new google.maps.Point(17, 34),
	        scaledSize: new google.maps.Size(25, 25)
	      };

	  //     // Create a marker for each place.
	      marker = new google.maps.Marker({
	        setMap: map,
	        // icon: icon,
	        icon: '../corbeille_vide.png',
	        description: "Enter BucketList item",
		    	flag: true,
	        title: place.name,
	        position: place.geometry.location
	      })

	      if (place.geometry.viewport) {
	        // Only geocodes have viewport.
	        bounds.union(place.geometry.viewport);
	      } else {
	        bounds.extend(place.geometry.location);
	      }
	    });
	    map.fitBounds(bounds);


	    // google.maps.event.addDomListener(addPacInput, "click", function() {
	    //  return $http({
			  // 	method: 'POST',
			  // 	url: 'http://localhost:9001/map',
			  // 	data: {
			  // 		description: marker.description,
			  // 		flag: marker.flag,
			  // 		coordinates: marker.position
			  // 	}
			  // }).then(function(res) {
		   //    	console.log("marker created", res);
		   //  	cb();
		   //  });
	    // })
	   
	  })
	  
	  
	};

})
