angular.module('bucketList').controller('signupCtrl', function($scope, userService, $state){

  $scope.register = function(){
    console.log("registering signupCtrl");
    console.log("username: ",$scope.username);
    userService.addUser({
    	username: $scope.username,
    	password: $scope.password
    }).then(function(res){
        console.log("sent data signupCtrl");
    	$state.go('auth.home');
    }).catch(function(err) {
    	if (err.status) {
    		$scope.error = "Sorry, that user already exists.";
    	}
    });
  };

});