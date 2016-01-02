var app = angular.module('bucketList', ['ui.router', 'angularMoment']).config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	$urlRouterProvider.otherwise('/login');

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'js/templates/login.html',
			controller: 'loginCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'js/templates/signup.html',
			controller: 'signupCtrl'
		})
		.state('logout', {
			url:'/logout',
			controller: function(userService, $state) {
				userService.logout().then(function() {
					$state.go('/login');
				});
			}
		})
		.state('auth', {
			abstract: true,
			template: '<ui-view><ui-view>',
			resolve: {
				user: function(userService) {
					return userService.getAuthedUser()
				}
			}
		})
		.state('auth.home', {
			url: '/home',
			templateUrl: 'js/templates/listTmpl.html',
			controller: 'listCtrl'
		})
		.state('auth.map', {
			url: '/map',
			templateUrl: 'js/templates/mapTmpl.html',
			controller: 'mapCtrl'
		})
		.state('auth.completed', {
			url: '/completed',
			templateUrl: 'js/templates/completedTmpl.html',
			controller: 'completedCtrl'
		});

		$httpProvider.interceptors.push(function($q, $injector, $location) {
			return {
				responseError: function(rejection) {
					console.log("VERY BAD", rejection);
					if(rejection.status === 401) {
						document.location = "/#/login";
					}
					//if not a 401, do nothing with this error.
					//this is necessary to make a'responseError'
					//interceptor a no-op
					return $q.reject(rejection);
				}
			};
		});

});

