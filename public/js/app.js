var app = angular.module('bucketList', ['ui.router']).config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'js/templates/listTmpl.html',
			controller: 'listCtrl'
		})
		.state('map', {
			url: '/map',
			templateUrl: 'js/templates/mapTmpl.html',
			controller: 'mapCtrl'
		})
		.state('completed', {
			url: '/completed-list',
			templateUrl: 'js/templates/completedTmpl.html',
			contoller: 'completedCtrl'
		});

});

