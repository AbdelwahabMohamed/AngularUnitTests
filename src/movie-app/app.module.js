angular.module('movieApp', ['ui.bootstrap', 'ngRoute', 'ngTouch', 'ngAnimate', 'ngSanitize', 'omdb', 'customDirectives'])
    .config(function ($routeProvider) {
        $routeProvider.when('/results', {
            templateUrl: 'movie-app/results.html',
            controller: 'ResultsController'
        }).otherwise({
            redirectTo: '/'
        }); 
    }); 