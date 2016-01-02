angular.module('bucketList').controller('loginCtrl', function($scope, userService, $state){
  $scope.login = function(){
    userService.login({
    	username: $scope.username,
    	password: $scope.password
    }).then(function(){
      $scope.credentials = {};
      $state.go('auth.home');
    });
  }
});