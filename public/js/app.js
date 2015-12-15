var app = angular.module('bucketList', ['ui.router']).config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'js/templates/listTmplcopy.html',
			controller: 'listCtrlcopy'
		})
		.state('map', {
			url: '/map',
			templateUrl: 'js/templates/mapTmpl.html',
			controller: 'mapCtrl'
		})
		.state('completed', {
			url: '/completed',
			templateUrl: 'js/templates/completedTmpl.html',
			controller: 'completedCtrl'
		});

});

