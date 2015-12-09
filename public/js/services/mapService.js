angular.module('bucketList').service('mapService', function($http) {

	this.getBuckets = function () {
		return $http({
			method: 'GET',
			url: 'http://localhost:9001/map'
		})
	};

	this.initMap = function() {
		return map = new google.maps.Map(document.getElementById('map'), {
			zoom: 2,
			center: new google.maps.LatLng(30, 0),
			mapTypeId: google.maps.MapTypeId.ROAD
		});
	};
  
  this.clickAddBucket = function (options) {

  	return google.maps.event.addListener(map, "click", function(e) {
  		console.log(e.latLng);
	  	//(2) Create a marker normally.
	    //Marker class accepts any properties even if it's not related with Marker.
	    var marker = new google.maps.Marker({
	    	position: e.latLng,
		    map: map,
		    icon: '../corbeille_vide.png'
		  });
	    
	    //(3)Set a flag property which stands for the editing mode.
	    marker.set("editing", false);
	    
	    //(4)Create a div element to display the HTML strings.
	    var htmlBox = document.createElement("div");
	    htmlBox.innerHTML = options.html || "";
	    htmlBox.style.width = "200px";
	    htmlBox.style.height = "50px";
	    
	    //(5)Create a textarea for edit the HTML strings.
	    var textBox = document.createElement("textarea");
	    textBox.innerText = options.html || "";
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
	    
	    //(8)Create an info window
	    var infoWnd = new google.maps.InfoWindow({
	      content : container
	    });

	    //(10)Switch the mode. Since Boolean type for editing property,
	    //the value can be change just negation.
	    google.maps.event.addDomListener(editBtn, "click", function() {
	      marker.set("editing", !marker.editing);
	    });

	    google.maps.event.addDomListener(saveBtn, "click", function () {
	    	marker.set("editing", false);
	    	return $http({
	      	method: 'POST',
	      	url: 'http://localhost:9001/map',
	      	data: {
	      		description: marker.html,
	      		coordinates: marker.position
	      	},
	      });
	    })

	    google.maps.event.addDomListener(deleteBtn, "click", function() {
	    	marker.setMap(null);
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
    	console.log("marker", marker);
    });
  google.maps.event.addDomListener(window, "load", initialize);
  };
	

})
