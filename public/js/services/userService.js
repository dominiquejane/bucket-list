angular.module('bucketList').service('userService', function($http, $q, $rootScope, $state){
  var user;

  this.addUser = function(newUser){
    console.log("sent data 2 userService");
    console.log(newUser);
    return $http({
      method: 'POST',
      url: '/api/users',
      data: newUser
    });
  };

  this.login = function(credentials){
    var dfd = $q.defer()
    $http({
      method: 'POST',
      url: '/api/auth/local',
      data: credentials
    }).then(function(res){
      console.log('Result from user login', res)
      dfd.resolve(res.data);
    })
    return dfd.promise
  }

  this.logout = function(){
    return $http({
      method: 'GET',
      url: '/api/auth/logout'
    }).then(function(){
      return $state.go('login')
    })
  }

  this.getAuthedUser = function(){
    var dfd = $q.defer()
    if(user){
      dfd.resolve(user);
    } else {
      $http({
        method: 'GET',
        url: '/api/users/currentUser'
      }).then(function(res){
        user = res.data;
        console.log('Result getting the logged in user', res);
        dfd.resolve(res.data);
      })
    }
    return dfd.promise;
  };

});

